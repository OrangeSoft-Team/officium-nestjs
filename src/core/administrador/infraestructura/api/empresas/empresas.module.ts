import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerCrearEmpresa } from '../../cqrs/handlers/CrearEmpresa.handler'
import { HandlerEditarEmpresa } from '../../cqrs/handlers/EditarEmpresa.handler'
import { HandlerEliminarEmpresa } from '../../cqrs/handlers/EliminarEmpresa.handler'
import { HandlerVerDetalleEmpresas } from '../../cqrs/handlers/VerDetalleEmpresa.handler'
import { HandlerVerListaEmpresas } from '../../cqrs/handlers/VerListaEmpresas.handler'
import { EmpresaORM } from '../../persistencia/Empresa.orm'
import { ControladorEmpresasAdministrador } from './empresas.controller'

const ManejadoresComandos = [
  HandlerCrearEmpresa,
  HandlerEditarEmpresa,
  HandlerEliminarEmpresa,
]

const ManejadoresQueries = [HandlerVerDetalleEmpresas, HandlerVerListaEmpresas]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmpresaORM])],
  controllers: [ControladorEmpresasAdministrador],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloEmpresasAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorEmpresasAdministrador)
  }
}
