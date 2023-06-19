import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: { sub: number; email: string }) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { email: payload.email },
      })
    } catch (exception) {
      throw new HttpException(
        exception.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
