import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthEmpresa } from './auth/auth.module'

@Module({
  imports: [ModuloAuthEmpresa],
  controllers: [],
})
export class ModuloCoreEmpleador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
