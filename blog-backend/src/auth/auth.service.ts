import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: Omit<User, 'password'>; access_token: string }> {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = await this.usersService.create(registerDto);
    const payload = { email: user.email, sub: user.id };
    const { password, ...userResult } = user;

    return {
      user: userResult,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'>; access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const { password, ...userResult } = user;

    return {
      user: userResult,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.usersService.findById(payload.sub);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
