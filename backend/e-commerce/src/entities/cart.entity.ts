import { UserEntity } from 'src/entities/user.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.cart, {cascade:true, eager:true})
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  items: CartItemEntity[];
}

