import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'blog_db',
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Chỉ dùng trong development
  autoLoadEntities: true,
};
