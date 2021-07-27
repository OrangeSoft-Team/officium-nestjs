import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloAuthAdministrador } from './auth/auth.module'
import { ModuloEmpresasAdministrador } from './empresas/empresas.module'
import { ModuloPerfilAdministrador } from './perfil/perfil.module'

@Module({
  imports: [
    ModuloAuthAdministrador,
    ModuloPerfilAdministrador,
    ModuloEmpresasAdministrador,
  ],
  controllers: [],
})
export class ModuloCoreAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
