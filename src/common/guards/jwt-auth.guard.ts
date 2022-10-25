import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;
    const isTokenValid = (await super.canActivate(context)) as boolean;
    const isVerified = context.switchToHttp().getRequest().user.verified;
    if (isTokenValid) {
      if (!isVerified) {
        const isAllowUnverified = this._reflector.get<boolean>(
          'allowUnverified',
          context.getHandler(),
        );
        if (!isAllowUnverified)
          throw new ForbiddenException(
            'Your account not confirmed yet by Admin',
          );
      }
    }

    return isTokenValid;
  }
}
