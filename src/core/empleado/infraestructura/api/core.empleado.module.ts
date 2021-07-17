import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { DireccionORM } from '../persistencia/Direccion.orm'
import { EmpleadoORM } from '../persistencia/Empleado.orm'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaisORM,
      EstadoORM,
      CiudadORM,
      DireccionORM,
      EmpleadoORM,
    ]),
  ],
  controllers: [],
})
export class ModuloCoreEmpleado {}
