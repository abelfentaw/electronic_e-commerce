import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { orderProductEntity } from '../entities/order-product.entity';
import { UserService } from 'src/user/user.service';
import { orderShippEntity } from '../entities/ordershipping.entity';
import { ProductService } from 'src/product/product.service';
import { orderStatus } from './enums/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UserEntity } from 'src/entities/user.entity';
// import { NotificationsService } from 'src/notification/notifications.service';
import { PaymentStatus } from 'src/payment/paymnet.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(orderProductEntity)
    private ordProdRepository: Repository<orderProductEntity>,
    private userService: UserService,
    private productService: ProductService,
    // private notificationService:NotificationsService
  ) {}

  async create(createOrderDto: CreateOrderDto, currentUser:UserEntity){

    const orderShip = new orderShippEntity();
    Object.assign(orderShip, createOrderDto.orderShipping);

    const orderEntity = new OrderEntity();
    orderEntity.addressShipping =orderShip;
    orderEntity.user = currentUser;
     console.log('OrderEntity properties before save:', orderEntity);


    const orderTbl = await this.orderRepository.save(orderEntity);
    console.log(orderTbl)
    
    for (let i = 0; i < createOrderDto.orderProduct.length; i++)
       {
      const products = await this.productService.findOne(
        createOrderDto.orderProduct[i].productId,
      );
      if(!products){
          throw new NotFoundException('products not found')
         }

      const product_quantity = createOrderDto.orderProduct[i].product_quantity;
      const product_unit_price = products.price * product_quantity

      if(products.stock < product_quantity){
        throw new BadRequestException('insufficient product')
      }

      const opEntity = new orderProductEntity();

        (opEntity.order = orderTbl),
        (opEntity.products = products),
        (opEntity.product_quantity = product_quantity),
        (opEntity.product_unit_price = product_unit_price);

      await this.ordProdRepository.save(opEntity);      
    }
    return await this.orderRepository.findOne({where:{id:orderTbl.id}});

  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        user: true,
        items: { 
          products: true
         },
        addressShipping: true,
      },
    });
  }

  async findOrderById(orderId: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where:{
      id:orderId
    }, 
      relations:{
        user:true,
        items:{products:true},
        addressShipping:true
      }
      });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
     

  async update(id:number, updateOrderStatusDto: UpdateOrderStatusDto) {
    const user = await this.userService.findOne(updateOrderStatusDto.userId);
  if(!user){
    throw new NotFoundException('user not found')
  }
    let order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('the order is not found');

    if (
      order.status === orderStatus.DELIVERED ||
      order.status === orderStatus.CANCELED
    ) {
      throw new BadRequestException(`order already ${order.status}`);
    }

    if (
      order.status === orderStatus.PROCESSING &&
      updateOrderStatusDto.status !== orderStatus.SHIPPED
    ) {
      throw new BadRequestException(`delivery before shipped`);
    }

    if (
      order.status === orderStatus.SHIPPED &&
      updateOrderStatusDto.status === orderStatus.SHIPPED
    ) {
      return order;
    }

    if (updateOrderStatusDto.status === orderStatus.SHIPPED) {
      order.shippedAt = new Date();
    }

    if (updateOrderStatusDto.status === orderStatus.DELIVERED) {
      order.deliveredAt = new Date();
    }
    order.status = updateOrderStatusDto.status;
    order.user = user;
    order = await this.orderRepository.save(order);
    if (updateOrderStatusDto.status === orderStatus.DELIVERED) {
      await this.stockUpdate(order, orderStatus.DELIVERED);
    }
    return order;
  }


  async updateOrderStatus(txRef: string, status: PaymentStatus): Promise<OrderEntity> { 
    const order = await this.orderRepository.findOne({ 
      where: { txRef },
      relations: ['user']
    });
  
    if (!order) {
      throw new NotFoundException(`Order with txRef ${txRef} not found`);
    }
    // if (order.user) { 
    //   await this.notificationService.sendOrderUpdateNotification(
    //     order.user.email,
    //     order.id,
    //     status,
    //   );
    // } else {
    //   console.error(`Order with txRef ${txRef} has no associated user.`);
    // }
    order.status = status;
    return await this.orderRepository.save(order);
  }


  async cancel(id: number) {
    let order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new NotFoundException('the order is not found');
    if (order.status === orderStatus.CANCELED) return order;
    order.status = orderStatus.CANCELED;
    order = await this.orderRepository.save(order);
    await this.stockUpdate(order, orderStatus.CANCELED);
    return order;
  }
  async remove(id: number) {
    const order = await this.orderRepository.findOne({where:{id}})
    if(!order){
      throw new NotFoundException('order not found')
    }
    return await this.orderRepository.delete(id);
  }
  async stockUpdate(order: OrderEntity, status: string) {
    if (Array.isArray(order.items)) {
      for (const op of order.items) {
        await this.productService.updateStock(
          op.products.id,
          op.product_quantity,
          status,
        );
      }
    } else {
      console.error('ordProd is not an array:', order.items);
    }
  }
}
