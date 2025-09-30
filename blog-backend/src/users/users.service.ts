import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { RegisterDto, UpdateProfileDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create new user (for registration)
   */
  async create(registerDto: RegisterDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 12);

      const user = this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  /**
   * Create user with specific role (for seeding)
   */
  async createWithRole(data: RegisterDto & { role?: UserRole }): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 12);

      const user = this.userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        bio: data.bio,
        avatar: data.avatar,
        role: data.role || UserRole.USER,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  /**
   * Find user by email (for auth)
   */
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { email: email.toLowerCase() },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch user by email');
    }
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch user');
    }
  }

  /**
   * Get user profile (without password)
   */
  async getProfile(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);
    const { password, ...profile } = user;
    return profile;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    try {
      // Validate user exists
      await this.findById(id);

      // Validate input data
      if (updateProfileDto.name && updateProfileDto.name.trim().length < 2) {
        throw new BadRequestException('Name must be at least 2 characters');
      }

      if (updateProfileDto.bio && updateProfileDto.bio.length > 500) {
        throw new BadRequestException('Bio must not exceed 500 characters');
      }

      // Prepare update data
      const updateData: Partial<User> = {};

      if (updateProfileDto.name) {
        updateData.name = updateProfileDto.name.trim();
      }

      if (updateProfileDto.bio !== undefined) {
        updateData.bio = updateProfileDto.bio?.trim() || null;
      }

      if (updateProfileDto.avatar !== undefined) {
        updateData.avatar = updateProfileDto.avatar || null;
      }

      // Perform update
      await this.userRepository.update(id, updateData);

      // Return updated user
      return await this.findById(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update user profile');
    }
  }

  /**
   * Validate user password
   */
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email.toLowerCase() },
      });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /**
   * Delete user account
   */
  async remove(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      await this.userRepository.remove(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user account');
    }
  }
}
