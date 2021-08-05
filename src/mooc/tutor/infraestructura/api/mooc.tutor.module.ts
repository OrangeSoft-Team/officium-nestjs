import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthAdministrador } from '../../../../core/administrador/infraestructura/api/auth/auth.module'



@Module({
  imports: [
    ModuloAuthAdministrador  ],
  controllers: [],
})
export class ModuloMoocTutor {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}