/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-class-members */
import { CartItemEntity } from 'src/entities/cart-item.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { orderProductEntity } from 'src/entities/order-product.entity';
import { Review } from 'src/entities/review.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Upload } from './upload.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;
  @Column()
  stock: number;
  @Column(
    "text",{nullable:true, array:true}
  )
  images?: string[]
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.products, { cascade: true })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (cat) => cat.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @OneToMany(() => orderProductEntity, (op) => op.products)
  ordProd: orderProductEntity[];

  @OneToMany(() => CartItemEntity, (items) => items.product)
  item: CartItemEntity[];

  @OneToMany(() => Review, (reviews) => reviews.products)
  reviews: Review[];

  @OneToMany(()=>Upload, upload=> upload.product)
  files:Upload[]
}
