import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerAgregarExperienciaLaboralEmpleado } from '../../cqrs/handlers/AgregarExperienciaLaboralEmpleado.handler'
import { DireccionORM } from '../../persistencia/Direccion.orm'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { ExperienciaLaboralORM } from '../../persistencia/ExperienciaLaboral.orm'
import { ControladorExperienciasEmpleado } from './experiencias.controller'
import { ServicioApiExperienciasEmpleado } from './experiencias.service'

const ManejadoresComandos = [HandlerAgregarExperienciaLaboralEmpleado]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      DireccionORM,
      EmpleadoORM,
      ExperienciaLaboralORM,
    ]),
  ],
  controllers: [ControladorExperienciasEmpleado],
  providers: [ServicioApiExperienciasEmpleado, ...ManejadoresComandos],
})
export class ModuloExperienciasEmpleado {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorExperienciasEmpleado)
  }
}
