import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-paytload.interface';
import { Logger } from '@nestjs/common';
@Injectable()
export class AuthService {
  private logger = new Logger('User Service');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    const { username, password } = authCredintialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505) {
        //duplicate username
        this.logger.error('username already exist');
        throw new ConflictException('username already exist');
      }
    }
  }

  async signIn(
    authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredintialsDto;
    const user = await this.userRepository.findOneBy({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      this.logger.error('Please check your login credintials');
      throw new UnauthorizedException('Please check your login credintials');
    }
  }
}
