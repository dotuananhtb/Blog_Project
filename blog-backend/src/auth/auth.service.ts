import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
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
    try {
      // Check if email already exists
      const existingUser = await this.usersService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      // Create new user
      const user = await this.usersService.create(registerDto);

      // Generate JWT token
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
      };

      const { password, ...userResult } = user;

      return {
        user: userResult,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Registration failed');
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'>; access_token: string }> {
    try {
      // Find user by email
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Validate password
      const isPasswordValid = await this.usersService.validatePassword(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Generate JWT token
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
      };

      const { password, ...userResult } = user;

      return {
        user: userResult,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed');
    }
  }

  async validateUser(payload: any): Promise<any> {
    try {
      const user = await this.usersService.findById(payload.sub);
      if (user) {
        const { password, ...result } = user;
        return {
          userId: result.id,
          email: result.email,
          role: result.role,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
