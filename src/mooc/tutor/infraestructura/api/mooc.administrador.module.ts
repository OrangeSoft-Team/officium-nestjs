import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'

@Module({
  imports: [],
  controllers: [],
})
export class ModuloMoocAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
