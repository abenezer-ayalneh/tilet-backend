import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { ErrorCustomException } from 'src/utils/exception/error.filter'
import { ErrorMessages } from 'src/utils/maps/error.maps'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })

      request['user'] = await this.prismaService.user.findFirstOrThrow({
        where: { id: payload['sub'] },
      })
    } catch (error) {
      console.error(error)
      if (error instanceof ErrorCustomException) {
        throw error
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ErrorCustomException(
            ErrorMessages.NOT_FOUND,
            HttpStatus.UNPROCESSABLE_ENTITY,
            'user',
          )
        } else {
          throw new ErrorCustomException(
            ErrorMessages.SOMETHING_WENT_WRONG,
            HttpStatus.INTERNAL_SERVER_ERROR,
            'authentication',
          )
        }
      }
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
