import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class MiddlewareSesion implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    next()
  }
}
