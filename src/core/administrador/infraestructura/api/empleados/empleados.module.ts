import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerListarEmpleados } from '../../cqrs/handlers/ListarEmpleados.handler'
import { HandlerVerPerfilEmpleado } from '../../cqrs/handlers/VerPerfilEmpleado.handler'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { DireccionORM } from '../../persistencia/Direccion.orm'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { ExperienciaLaboralORM } from '../../persistencia/ExperienciaLaboral.orm'
import { HabilidadORM } from '../../persistencia/Habilidad.orm'
import { HabilidadEmpleadoORM } from '../../persistencia/HabilidadEmpleado.orm'
import { PaisORM } from '../../persistencia/Pais.orm'

import { ControladorEmpleadosAdministrador } from './empleados.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerListarEmpleados, HandlerVerPerfilEmpleado]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      EmpleadoORM,
      ExperienciaLaboralORM,
      HabilidadORM,
      HabilidadEmpleadoORM,
      DireccionORM,
      PaisORM,
      EstadoORM,
      CiudadORM,
    ]),
  ],
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
