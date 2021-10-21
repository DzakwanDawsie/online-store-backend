import { ExecutionContext,Injectable,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user || (user && user.role != 'admin')) {
      throw err || new UnauthorizedException() || new UnauthorizedException();
    }
    return user;
  }
}