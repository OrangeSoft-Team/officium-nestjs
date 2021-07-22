import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerRegistrarEmpleado } from '../../cqrs/handlers/RegistrarEmpleado.handler'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { DireccionORM } from '../../persistencia/Direccion.orm'
import { EmpleadoORM } from '../../persistencia/Empleado.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorRegistroEmpleado } from './registro.controller'

const ManejadoresComandos = [HandlerRegistrarEmpleado]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      PaisORM,
      EstadoORM,
      CiudadORM,
      DireccionORM,
      EmpleadoORM,
    ]),
  ],
  controllers: [ControladorRegistroEmpleado],
  providers: [...ManejadoresComandos],
})
export class ModuloRegistroEmpleado {}
