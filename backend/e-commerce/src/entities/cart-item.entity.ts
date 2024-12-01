import { ProductEntity } from 'src/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { 
    cascade:true,
    onDelete:"CASCADE" 
  })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (products) => products.item, {
    cascade: true,
    eager:true
  })
  product: ProductEntity;

  @Column()
  quantity: number;
}
