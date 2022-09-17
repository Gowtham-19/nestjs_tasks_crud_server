import { Post, Body, Controller } from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authService.createUser(authCredintialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }
}
