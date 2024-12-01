import { CurrentUser } from './../utitlity/current-user.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({
    summary:' add a product to cart'
  })
  addItem(
    @Request() req:any,
    @Body() createCartDto: CreateCartDto) {
    const userId= req.currentUser.id
    return this.cartService.addItem(userId,createCartDto);
  }

  @Get('all-cart')
  @ApiOperation({
    summary:' get a product from cart'
  })
  findAllCart(@Request() req:any) {
    const userId= req.currentUser.id
    return this.cartService.getCartAll(userId);
  }


  @Patch('update/:id')
  @ApiOperation({
    summary:' update a product of cart'
  })
  update(@Param('id') ItemId: string,
         @Body() updateCartDto: UpdateCartDto,
         @Request() req:any) {
    const userId=req.currentUser.id
    return this.cartService.updateItem(userId,+ItemId, updateCartDto);
  }

  @Delete('remove/:id')
  @ApiOperation({
    summary:' remove a product from cart'
  })
 async remove(
      @Param('id') itemId: string,
       @Request() req:any) 
       {
    const userId=req.currentUser.id
    return await this.cartService.removeItem(userId,+itemId);
  }

  @Post('checkout')
  async checkout(@Request() req:any){
    const userId=req.currentUser.id
    await this.cartService.clearCart(userId)
    return {message:'checkout successful'}
  }
  
}
