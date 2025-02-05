import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest()
    const authHeader: string | undefined = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Authorization Header')
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':')
    const [username, password] = credentials

    if (username !== 'testuser' || password !== 'testpassword') {
      throw new UnauthorizedException('Invalid Credentials')
    }

    return true
  }
}
