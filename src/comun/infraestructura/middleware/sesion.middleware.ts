import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

@Injectable()
export class MiddlewareSesion implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token
    try {
      const id_auth = verify(token, process.env.JWT_SECRET)
      req.body.idUsuario = id_auth
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
