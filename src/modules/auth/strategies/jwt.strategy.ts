import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { jwtConstants } from '@common/constants/jwt.constants';
import { User } from '../../user/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback) {
    const user: User = await this._authService.validateUser(payload);

    if (!user) {
      return done(new UnauthorizedException('Token is invalid'), false);
    }
    (<any>user).verified = !payload?.notVerified;
    return done(null, user, payload.iat);
  }
}
