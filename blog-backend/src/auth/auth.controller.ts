import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Login failed', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    // Với JWT, logout chỉ cần client xóa token
    // Nếu muốn blacklist token, cần implement token blacklist
    return { message: 'Logged out successfully' };
  }
}
