import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerActualizarHabilidadesEmpleado } from '../../cqrs/handlers/ActualizarHabilidadesEmpleado.handler'
import { HandlerConsultarHabilidadesEmpleado } from '../../cqrs/handlers/ConsultarHabilidadesEmpleado.handler'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { HabilidadORM } from '../../persistencia/Habilidad.orm'
import { HabilidadEmpleadoORM } from '../../persistencia/HabilidadEmpleado.orm'
import { ControladorHabilidadesEmpleado } from './habilidades.controller'

const ManejadoresComandos = [HandlerActualizarHabilidadesEmpleado]

const ManejadoresQueries = [HandlerConsultarHabilidadesEmpleado]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([EmpleadoORM, HabilidadORM, HabilidadEmpleadoORM]),
  ],
  controllers: [ControladorHabilidadesEmpleado],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloHabilidadesEmpleado {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorHabilidadesEmpleado)
  }
}
