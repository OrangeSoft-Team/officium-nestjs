import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerListarEmpleados } from '../../cqrs/handlers/ListarEmpleados.handler'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'

import { ControladorEmpleadosAdministrador } from './empleados.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerListarEmpleados]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmpleadoORM])],
  controllers: [ControladorEmpleadosAdministrador],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloEmpleadosAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareSesion)
      .forRoutes(ControladorEmpleadosAdministrador)
  }
}
