// import { NotificationsModule } from './../notification/notifications.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { orderShippEntity } from '../entities/ordershipping.entity';
import { orderProductEntity } from '../entities/order-product.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    OrderEntity,
    orderShippEntity,
    orderProductEntity,
  ]),
  UserModule,
  ProductModule,
  // NotificationsModule
],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
