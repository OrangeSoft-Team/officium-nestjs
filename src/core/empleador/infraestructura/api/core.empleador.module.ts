import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthEmpresa } from './auth/auth.module'
import { ModuloPerfilEmpresa } from './perfil/perfil.module'

@Module({
  imports: [ModuloAuthEmpresa, ModuloPerfilEmpresa],
  controllers: [],
})
export class ModuloCoreEmpleador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
