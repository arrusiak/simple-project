import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import {
  AuthRequestDto, RegisterUserDto,
} from './dto/auth.dto';
import { User } from '../user/models/user.model';
import { IAuthMessage } from '@interfaces/auth/IAuthMessage';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly _user: typeof User,
    private readonly _sequelize: Sequelize,
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * @description User Registration
   * @param registerUserDto
   */
  public async signUp(
    registerUserDto: RegisterUserDto,
  ): Promise<{ statusCode: number; message: string }> {
      await this._usersService.checkUserByEmail(registerUserDto.email);
      await this._user.create({
        ...registerUserDto
      });

      return {
        statusCode: 201,
        message: 'User is registered',
      };
  }

  /**
   * @description Main Auth Service & Return access_token
   * @param loginInfo
   */
  public async auth(
    loginInfo: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    const user = await this._usersService.getUserByEmail(loginInfo.email, true);
    if (user?.verifyPassword(loginInfo.password)) {
      return await this.login(user);
    } else {
      throw new BadRequestException('Incorrect Credentials');
    }
  }

  /**
   * login
   */
  public async login(user: User): Promise<IAuthResponse> {
    if (!user) throw new NotFoundException('User not Found');

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      iat: new Date().getTime() / 1000,
    };
    const accessToken = this._jwtService.sign(jwtPayload);
    if (!accessToken) throw new BadRequestException('Incorrect Credentials');
    // user = user.toJSON();

    return {
      authorized: true,
      access_token: accessToken,
      user,
    };
  }

  /**
   * @description  Validate User Decoded From JWT
   */
  public async validateUser(payload: IJwtPayload): Promise<User> {
    return await this._usersService.validateUser(payload.id);
  }
}
