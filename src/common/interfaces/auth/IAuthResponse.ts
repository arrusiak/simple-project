import { User } from '@modules/user/models/user.model';

export interface IAuthResponse {
  authorized: boolean;
  accountStatus?: string;
  access_token: string;
  user?: User;
}
