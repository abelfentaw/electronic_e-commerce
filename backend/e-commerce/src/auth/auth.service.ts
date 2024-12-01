import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateSignupDto } from './dto/create-signup-dto';
import { CreateSigninDto } from './dto/create-signin-dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtPayload } from 'src/utitlity/jwt.interface';
import { sign } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) 
     private userRepository:Repository<UserEntity>,
     
     private jwtService: JwtService) {}

     
  async createUser(createSignupDto:CreateSignupDto): Promise<UserEntity>{
    createSignupDto.password= await bcrypt.hash(createSignupDto.password,8)
    const user= this.userRepository.create(createSignupDto)
     await this.userRepository.save(user)
     delete user.password
     return user;
}

  async signup(createsignupDto: CreateSignupDto) {
    const existingUser = await this.findOneByEmail(createsignupDto.email);
    
    if (existingUser) {
      throw new BadRequestException ("email already exist");
    }
    return this.createUser(createsignupDto);
  }
  async signin(signinDto: CreateSigninDto):Promise<UserEntity>{
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: signinDto.email })
      .getOne();
    if(!userExists || !(await bcrypt.compare(signinDto.password, userExists.password))){
      throw new UnauthorizedException("email or password in correct")
    }
    delete userExists.password
    return userExists
      }
    async accessToken(user: UserEntity): Promise<string> {
      return sign(
        { id: user.id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn:3600 },
      );
    }
    async findOneByEmail(email: string): Promise< UserEntity| undefined> {
      return await this.userRepository.findOne({ where: { email },select:['id','email','password']})
    
  }
}
