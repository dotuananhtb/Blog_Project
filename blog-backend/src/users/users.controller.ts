import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Không trả về password
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const user = await this.usersService.updateProfile(
      req.user.userId,
      updateProfileDto,
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Không trả về password
    const { password, ...result } = user;
    return result;
  }
}
