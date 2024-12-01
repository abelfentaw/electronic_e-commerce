import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'to create an order  ',
  })
  create(
    // @Request() req:any,
    @CurrentUser() currentUser:UserEntity,
    @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, currentUser);
  }
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }
  
  @Get(':id')
  async getOne(@Param('id') orderId:number) {
    const order=await this.orderService.findOrderById(orderId);
    if(!order){
      throw new NotFoundException('user not found')
    }
    return order
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Put(':id')
  async update(
    @Param('id') id:number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.update(id,updateOrderStatusDto);
  }

  @Put('cancel/:id')
  async cancel(@Param('id') id: string) {
    return this.orderService.cancel(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }
}
