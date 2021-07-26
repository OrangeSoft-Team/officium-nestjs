import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerEditarPerfilAdministrador } from '../../cqrs/handlers/EditarPerfilAdministrador.handler'
import { HandlerObtenerPerfilAdministrador } from '../../cqrs/handlers/ObtenerPerfilAdministrador.handler'
import { AdministradorORM } from '../../persistencia/Administrador.orm'
import { ControladorPerfilAdministrador } from './perfil.controller'

const ManejadoresComandos = [HandlerEditarPerfilAdministrador]

const ManejadoresQueries = [HandlerObtenerPerfilAdministrador]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AdministradorORM])],
  controllers: [ControladorPerfilAdministrador],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloPerfilAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorPerfilAdministrador)
  }
}
