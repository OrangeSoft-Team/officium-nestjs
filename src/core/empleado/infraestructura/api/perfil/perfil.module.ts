import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerVerPerfilEmpleadoActual } from '../../cqrs/handlers/VerPerfilEmpleado.handler'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { DireccionORM } from '../../persistencia/Direccion.orm'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorPerfilEmpleado } from './perfil.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerVerPerfilEmpleadoActual]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      EmpleadoORM,
      DireccionORM,
      PaisORM,
      EstadoORM,
      CiudadORM,
    ]),
  ],
  controllers: [ControladorPerfilEmpleado],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloPerfilEmpleado {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorPerfilEmpleado)
  }
}
