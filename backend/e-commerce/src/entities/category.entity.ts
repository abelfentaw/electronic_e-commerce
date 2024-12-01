import { ProductEntity } from "src/entities/product.entity";
import { UserEntity } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @CreateDateColumn()
    createdAt:Timestamp
    @UpdateDateColumn()
    updatedAt:Timestamp


    @ManyToOne(()=>UserEntity, (User)=>User.categories,{cascade:true})
     user: UserEntity;
    @OneToMany(()=>ProductEntity,(prod)=>prod.category,{
    })
     products:ProductEntity[];
}
