import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './utitlity/auth-guard/auth-guard.guard';
import { APP_GUARD } from '@nestjs/core';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './utitlity/additional/jwt.strategy';
import { CurrentUserMiddleware } from './utitlity/middlewares/current-user.middlewares';
import { ReviewModule } from './review/review.module';
// import { ReviewModule } from './review/review.module';
import { UploadModule } from './upload/upload.module';
import { PaymentsModule } from './payment/payments.module';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal:true
      }),
      // JwtModule.registerAsync({
      //   imports:[ConfigModule],
      //   inject:[ConfigService],
      //   useFactory:(configService:ConfigService)=>({
      //     secret:configService.get<string>('JWT_SECRET'),
      //     signOptions:{
      //       expiresIn:3600,
      //     }
      //   })
      // }),
      TypeOrmModule.forRoot(dataSourceOptions),
      UserModule,
       AuthModule,
       ReviewModule,
          CategoriesModule,
          ProductModule,
          OrderModule,
          CartModule,
          SearchModule,
          UploadModule,
          PaymentsModule
          ],
    controllers: [],
    providers: [
 
    //   {
    //   provide:APP_GUARD,
    //   useClass:AuthGuard
    // }
     
    ],
   
  })
 export class AppModule{ 
configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(CurrentUserMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });
}

}
