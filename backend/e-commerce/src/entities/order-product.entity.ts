/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/entities/product.entity';

@Entity('orderProduct')
export class orderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_unit_price: number;
  @Column()
  product_quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {onDelete:"CASCADE"})
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.ordProd, {onDelete:"CASCADE"})
  products: ProductEntity;
}
