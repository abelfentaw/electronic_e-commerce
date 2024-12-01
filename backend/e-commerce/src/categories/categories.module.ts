import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/utitlity/auth-guard/auth-guard.guard'; 
import { ProductEntity } from 'src/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true
    }),
    JwtModule.registerAsync({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(configSeervice:ConfigService)=>({
  secret:configSeervice.get<string>('ACCESS_TOKEN_SECRET_KEY'),
  signOptions:{
    expiresIn:'1h'
  }
})
    }),

      TypeOrmModule.forFeature([CategoryEntity,ProductEntity]),UserModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,AuthGuard],
  exports:[CategoriesService]
})
export class CategoriesModule {}
