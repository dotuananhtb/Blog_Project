import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Controller('api/v1/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * GET /api/v1/users/profile
   * Get current user profile
   */
  @Get('profile')
  async getProfile(@Request() req: AuthRequest) {
    try {
      const profile = await this.usersService.getProfile(req.user.userId);

      return {
        success: true,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to get user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * PUT /api/v1/users/profile
   * Update current user profile
   */
  @Put('profile')
  async updateProfile(
    @Request() req: AuthRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      const updatedUser = await this.usersService.updateProfile(
        req.user.userId,
        updateProfileDto,
      );

      const { password, ...profile } = updatedUser;

      return {
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to update user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/v1/users/:id
   * Get user by ID (public profile)
   */
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.usersService.getProfile(id);

      // Only return public information
      const publicProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        created_at: user.created_at,
      };

      return {
        success: true,
        message: 'User profile retrieved successfully',
        data: publicProfile,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to get user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /api/v1/users/profile
   * Delete current user account
   */
  @Delete('profile')
  async deleteAccount(@Request() req: AuthRequest) {
    try {
      await this.usersService.remove(req.user.userId);

      return {
        success: true,
        message: 'Account deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to delete account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
