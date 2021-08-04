import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'

@Injectable()
export class MiddlewareSesion implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token || req.headers.authorization
      const payload = <JwtPayload>verify(token, process.env.JWT_SECRET)
      req.body.idUsuario = payload.idUsuario
    } catch {
      res.clearCookie('token')
      throw new HttpException(
        {
          mensaje: 'El usuario no se encuentra autorizado.',
          origen: 'UsuarioNoAutorizado',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
    next()
  }
}
