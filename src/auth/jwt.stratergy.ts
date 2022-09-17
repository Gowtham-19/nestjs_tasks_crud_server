/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-paytload.interface';
import { User } from './user.entity';
@Injectable()
export class JwtStratergty extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'secret1',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload:JwtPayload):Promise<User>{
    const {username} = payload;
    const user:User = await this.userRepository.findOneBy({username});
    if(!user){
        throw new UnauthorizedException()
    }

    return user
  }
}
