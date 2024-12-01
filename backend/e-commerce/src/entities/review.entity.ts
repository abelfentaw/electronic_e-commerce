/* eslint-disable prettier/prettier */
import { ProductEntity } from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (products) => products.reviews)
  products: ProductEntity;
}
