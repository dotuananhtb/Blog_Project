import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    try {
      // Check if admin user already exists
      const adminEmail = 'admin@blog.com';
      const existingAdmin = await this.usersService.findByEmail(adminEmail);

      if (!existingAdmin) {
        this.logger.log('Creating default admin user...');

        const adminUser = await this.usersService.createWithRole({
          name: 'Administrator',
          email: adminEmail,
          password: 'admin123',
          bio: 'Default administrator account',
          avatar:
            'https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff',
          role: UserRole.ADMIN,
        });

        this.logger.log(`Default admin user created: ${adminUser.email}`);
      } else {
        this.logger.log('Default admin user already exists');
      }

      // Create a test user as well
      const testEmail = 'test@blog.com';
      const existingTest = await this.usersService.findByEmail(testEmail);

      if (!existingTest) {
        this.logger.log('Creating default test user...');

        const testUser = await this.usersService.createWithRole({
          name: 'Test User',
          email: testEmail,
          password: 'test123',
          bio: 'Default test user account',
          avatar:
            'https://ui-avatars.com/api/?name=Test&background=2563eb&color=fff',
          role: UserRole.USER,
        });

        this.logger.log(`Default test user created: ${testUser.email}`);
      } else {
        this.logger.log('Default test user already exists');
      }
    } catch (error) {
      this.logger.error('Failed to create default users:', error);
    }
  }
}
