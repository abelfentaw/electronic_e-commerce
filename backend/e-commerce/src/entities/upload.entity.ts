/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  filepath: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @ManyToOne(()=>ProductEntity, prod=> prod.files,{cascade:true})
  product:ProductEntity
}
