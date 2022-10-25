import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(User)
    private readonly _user: typeof User,
  ) {}

  /**
   * @description Get User Data By His Email Address
   * @param email
   * @param password
   */
  public async getUserByEmail(email: string, password = false): Promise<User> {
    return await this._user.findOne({
      where: {
        email: email,
      },
      attributes: [
        'id',
        'email',
        ...(password ? ['password'] : []),
        'phone',
        'createdAt',
      ],
      rejectOnEmpty: false,
    });
  }

  /**
   * @description Get User Data By His Email Address
   * @param $id
   * @param password
   */
  public async getUserById($id: string, password = false): Promise<User> {
    return await User.findByPk<User>($id, {
      rejectOnEmpty: new BadRequestException('User not found'),
    });
  }

  /**
   * @description Check User Data By His JWT Decoded Data
   * @param $id
   */
  public async validateUser($id: string): Promise<User> {
    const user = await User.findByPk<User>($id, {
      rejectOnEmpty: false,
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  /**
   * @description Check email is exist or not
   * @param email
   */
  public async checkUserByEmail(
    email: string,
  ): Promise<any> {
    const userByEmail = await this._user.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) throw new NotFoundException('Email is already registered');
    return true;
  }
}
