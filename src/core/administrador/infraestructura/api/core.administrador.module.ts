import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthAdministrador } from './auth/auth.module'

@Module({
  imports: [ModuloAuthAdministrador],
  controllers: [],
})
export class ModuloCoreAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
