import { User } from './../utitlity/additional/current-user.decorator';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity} from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

 async addItem(userId: number, createCartDto: CreateCartDto): Promise<CartEntity> {
  const {productId,quantity}=createCartDto
 const cart = await this.findOrCreateCart(userId)
 const product = await this.productService.findOne(productId) 
 if(!product){
  throw new NotFoundException('product not found')
 }

 let cartItem=cart.items.find((item)=>item.product.id === productId)
 if(cartItem){
  cartItem.quantity += quantity 
 }
 else{
  cartItem = this.cartItemRepository.create({
    cart,
    product,
    quantity
  })
  cart.items.push(cartItem)
   }
   await this.cartItemRepository.save(cartItem)
   console.log(`Created new cart item:`, cartItem);
   return await this.cartRepository.save(cart)
 
}

async updateItem(userId: number, id:number, updateCartDto: UpdateCartDto) {

  const cart=await this.findOrCreateCart(userId)
  let cartItem=cart.items.find((item)=>item.id === id)
  if(!cartItem){
    throw new NotFoundException('cart item not found')
  }
  cartItem.quantity = updateCartDto.quantity
  await this.cartItemRepository.save(cartItem)
  return await this.cartRepository.save(cart)
}

 async removeItem(userId:number,id: number):Promise<CartEntity> {
  const cart=await this.getCartAll(userId)
  if(!cart){
    throw new NotFoundException('cart not found')
  }
  const cartItemIndex = cart.items.findIndex((item)=> item.id===id)
  
  if(cartItemIndex==-1){
    throw new NotFoundException('cart item not found')
  }
  const [cartItem]= cart.items.splice(cartItemIndex,1)
  await this.cartItemRepository.remove(cartItem)
  return this.cartRepository.save(cart)
 }

 async getCartAll(userId:number) {
  return await this.findOrCreateCart(userId)
  }

 async clearCart(userId: number) {
    const cart=await this.getCartAll(userId)
    await this.cartItemRepository.remove(cart.items)
    cart.items=[]  
    return await this.cartRepository.save(cart);
  }

  async findOrCreateCart(userId:number){
    let cart = await this.cartRepository.findOne({
      where:{
        user:{id:userId}}, 
        relations:['items','items.product']})
    if(!cart){
      const user = await this.userService.findOne(userId)
      if(!user){
        throw new NotFoundException('user not found')
      }
     cart = this.cartRepository.create({user,items:[]})
       await this.cartRepository.save(cart)
    }
    
return cart
  }
}
