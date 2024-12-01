import { Controller, Post, Body, Param, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // Import ApiOperation


@ApiTags('Payments') // Add Swagger tag for organization
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent/:orderId')
  @ApiOperation({ summary: 'Create a payment intent for an order' }) // Add Swagger operation description
  async createPaymentIntent(
    @Param('orderId') orderId: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const paymentIntent = await this.paymentsService.createPaymentIntent(orderId);
      res.status(HttpStatus.OK).json(paymentIntent);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; 
      } else {
        console.error('Error creating payment intent:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to create payment intent',  });
      }
    }
  }

  @Post('verify')
  // @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Verify a payment' }) 
  async verifyPayment(@Body() requestBody: any, @Res() res: Response) {
    try {
      const txRef = requestBody.data.tx_ref;
      const chapaResponse = await this.paymentsService.verifyPaymentStatus(txRef);
      console.log('Chapa Verification Response:', chapaResponse);

      if (chapaResponse.status === 'success') {
        
        return res.status(HttpStatus.OK).json({
          message: 'Payment verified successfully',
          data: chapaResponse.data,
        });
      } else {
      
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Payment verification failed',
          data: chapaResponse.data,
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to verify payment status' });
    }
  }
  
  @Post('refund/:orderId')
  @ApiOperation({ summary: 'Process a refund for an order' }) // Add Swagger operation description
  async refund(
    @Param('orderId') orderId: number,
    @Body('refundAmount') refundAmount: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const refundResponse = await this.paymentsService.handleRefund(orderId, refundAmount);
      res.status(HttpStatus.OK).json(refundResponse);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        console.error('Error processing refund:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to process refund' });
      }
    }
  }
}
