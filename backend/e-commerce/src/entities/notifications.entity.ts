import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => UserEntity, user => user.notifications)
  user: UserEntity;
  
}