import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerObtenerHabilidades } from '../cqrs/handlers/ObtenerHabilidades.handler'
import { HabilidadORM } from '../persistencia/Habilidad.orm'
import { ControladorHabilidades } from './habilidades.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerObtenerHabilidades]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([HabilidadORM])],
  controllers: [ControladorHabilidades],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloHabilidades {}
