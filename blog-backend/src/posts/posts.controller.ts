import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/posts')
export class PostsController {
  @Get()
  async getAllPosts() {
    // Placeholder cho posts - sẽ implement sau
    return {
      message: 'Posts endpoint ready',
      posts: [],
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getMyPosts() {
    // Placeholder cho user posts - sẽ implement sau
    return {
      message: 'My posts endpoint ready',
      posts: [],
    };
  }
}
