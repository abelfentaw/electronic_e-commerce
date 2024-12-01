/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('orderShipping')
export class orderShippEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column({ default: ' ' })
  firstName: string;
  @Column({nullable:false})
  email:string
  @Column({ default: ' ' })
  lastName: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column({nullable:true})
  additionalDirection: string;

  @OneToOne(() => OrderEntity, (order) => 
    order.addressShipping,
   {
        onDelete:"CASCADE"
    }
  )
  order: OrderEntity;
}
