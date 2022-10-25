import { Body, Controller, Post, Query } from '@nestjs/common';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { AuthService } from './auth.service';
import { IsPublic } from '@common/decorators/is-public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import {
  AuthRequestDto,
  RegisterUserDto,
} from './dto/auth.dto';
import { IAuthMessage } from '@interfaces/auth/IAuthMessage';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly _auth: AuthService,
    private readonly _user: UserService,
  ) {}

  /**
   * user registration
   * @param registerUserDto
   */
  @IsPublic()
  @Post('registration')
  @ApiOperation({ summary: 'Registration' })
  async signUp(
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return this._auth.signUp(registerUserDto);
  }

  /**
   * @description Log in
   * @param credential
   */
  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Log in to system' })
  public async login(
    @Body() credential: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    return await this._auth.auth(credential);
  }
}
