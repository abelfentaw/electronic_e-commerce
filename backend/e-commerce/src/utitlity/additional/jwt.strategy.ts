/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtPayload } from '../jwt.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: jwtPayload) {
    const { email } = payload;
    const user: UserEntity = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
