import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerIniciarSesionEmpleado } from '../../cqrs/handlers/IniciarSesionEmpleado.handler'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { ControladorAuthEmpleado } from './auth.controller'
import { ServicioApiAuthEmpleado } from './auth.service'

const ManejadoresComandos = [HandlerIniciarSesionEmpleado]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmpleadoORM])],
  controllers: [ControladorAuthEmpleado],
  providers: [ServicioApiAuthEmpleado, ...ManejadoresComandos],
})
export class ModuloAuthEmpleado {}
