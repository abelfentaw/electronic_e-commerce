import { OrderService} from 'src/order/order.service'
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/user.service';
// import { NotificationsService } from 'src/notification/notifications.service';
import { PaymentStatus } from './paymnet.enum';

dotenv.config();

@Injectable()
export class PaymentsService {
  private readonly chapaApiUrl = 'https://api.chapa.co/v1/';
  private readonly secretKey = process.env.CHAPA_SECRET_KEY; 
  private readonly publicKey = process.env.CHAPA_PUBLIC_KEY; 

  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    private usersService: UserService,
    private readonly ordersService: OrderService,
    // private notificationsService: NotificationsService,
  ) {}

  async createPaymentIntent(orderId: number): Promise<any> {
    const order = await this.ordersRepository.findOne({    
      where: { id: orderId }, 
      relations: ['user', 'items', 'items.product'], 
    });
  
    if (!order) {
      throw new BadRequestException('Order not found');
    }
  
   
    const txRef = `order_${order.id}_${Date.now()}`; 
  
    const paymentData = {
      amount: order.total,
      currency: 'ETB', 
      email: order.user.email,
      first_name: order.user.firstName || '', 
      last_name: order.user.lastName || '', 
      tx_ref: txRef, 
      callback_url: 'http://localhost:3000/payment/verify', 
    };
  
    try {
      const headers = {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(
        `${this.chapaApiUrl}transaction/initialize`,
        paymentData,
        { headers },
      );
  
      if (response.data.status === 'success') {
      
        order.txRef = txRef;
        await this.ordersRepository.save(order);
  
        return {
          checkoutUrl: response.data.data.checkout_url,
          txRef: txRef,
        };
      } else {
        throw new Error('Failed to initialize Chapa payment');
      }
    } catch (error) {
      console.error('Error initializing Chapa payment:', error.response?.data || error.message);
      throw new BadRequestException('Failed to process payment');
    }
  }
  
  async verifyPaymentStatus(txRef: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(
        `${this.chapaApiUrl}transaction/verify/${txRef}`,
        { headers },
      );

      if (response.data.status === 'success') {
        const order = await this.ordersRepository.findOne({ 
          where: { txRef },
          relations: ['user'] // Load the user relation
        });

        if (!order) {
          console.error('Order not found for txRef:', txRef);
          throw new BadRequestException('Order not found');
        }

        try {
          await this.ordersService.updateOrderStatus(txRef, PaymentStatus.ORDER_PAID); 
          // await this.notificationsService.sendPaymentConfirmation(
          //   order.user.email,
          //   'confirmed',
          //   response.data.data.transaction_id,
          // );
        } catch (error) {
          console.error('Error updating order status or sending notification:', error);
        }

        return response.data;
      } else {
        throw new BadRequestException('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment status:', error.response?.data || error.message);
      throw new BadRequestException('Failed to verify payment status');
    }
  }
  async handleRefund(orderId: number, refundAmount: number): Promise<any> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    if (refundAmount > order.total) {
      throw new BadRequestException('Refund amount cannot exceed order total');
    }

    try {
      const refundData = {
        transaction_id: order.txRef, 
        amount: refundAmount,
        
      };

      const headers = {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${this.chapaApiUrl}/refund`, refundData, { headers });

      if (response.data.status === 'success') {
       
        // await this.notificationsService.sendRefundUpdate(order.user.email, 'processed', refundAmount);

        return response.data; 
      } else {
        throw new Error('Failed to process refund with Chapa');
      }
    } catch (error) {
      console.error('Error processing refund:', error.response?.data || error.message);
      throw new BadRequestException('Failed to process refund');
    }
  }

}
