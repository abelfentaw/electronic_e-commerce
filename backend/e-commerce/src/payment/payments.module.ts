import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrderEntity } from 'src/entities/order.entity';
// import { NotificationsModule } from 'src/notification/notifications.module';




@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
   UserModule,
   OrderModule, 
   AuthModule,
  //  NotificationsModule,
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  
})
export class PaymentsModule {}