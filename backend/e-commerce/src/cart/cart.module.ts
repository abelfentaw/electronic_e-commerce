import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity} from '../entities/cart.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/utitlity/additional/jwt.strategy';
import { CartItemEntity } from 'src/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CartEntity, CartItemEntity],),
      // PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),
    
    UserModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
