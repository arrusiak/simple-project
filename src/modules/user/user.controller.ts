import { CurrentUser } from '@currentUser';
import {
  Controller,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from './models/user.model';

/**
 *
 */
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
  ) {}

  /**
   * Get user Information
   */
  @Get('profile')
  @ApiOperation({ summary: 'Get user Profile' })
  async getUser(@CurrentUser() user: User): Promise<User> {
    return this._userService.getUserById(user.id);
  }
}
