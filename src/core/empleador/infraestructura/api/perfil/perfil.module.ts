import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { DireccionORM } from '../../../../empleador/infraestructura/persistencia/Direccion.orm'
import { HandlerActualizarPerfilEmpresa } from '../../cqrs/handlers/ActualizarPerfilEmpresa.handler'
import { HandlerObtenerPerfilEmpresa } from '../../cqrs/handlers/ObtenerPerfilEmpresa.handler'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { EmpresaORM } from '../../persistencia/Empresa.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { HabilidadORM } from '../../persistencia/Habilidad.orm'
import { HabilidadEmpresaORM } from '../../persistencia/HabilidadEmpresa.orm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorPerfilEmpresa } from './perfil.controller'

const ManejadoresComandos = [HandlerActualizarPerfilEmpresa]

const ManejadoresQueries = [HandlerObtenerPerfilEmpresa]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      EmpresaORM,
      DireccionORM,
      CiudadORM,
      EstadoORM,
      PaisORM,
      HabilidadORM,
      HabilidadEmpresaORM,
    ]),
  ],
  controllers: [ControladorPerfilEmpresa],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloPerfilEmpresa {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorPerfilEmpresa)
  }
}
