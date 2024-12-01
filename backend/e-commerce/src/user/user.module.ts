/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utitlity/additional/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1hr',
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService,

    // {
    //   provide:APP_GUARD,
    //   useClass:AuthenticationGuard
    // }
  ],
  exports: [UserService],
})
export class UserModule {}
