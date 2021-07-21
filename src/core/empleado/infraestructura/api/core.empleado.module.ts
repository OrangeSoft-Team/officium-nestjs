import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthEmpleado } from './auth/auth.module'
import { ModuloRegistroEmpleado } from './registro/registro.module'

@Module({
  imports: [ModuloRegistroEmpleado, ModuloAuthEmpleado],
})
export class ModuloCoreEmpleado {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
