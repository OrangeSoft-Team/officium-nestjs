import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerObtenerPaises } from '../cqrs/handlers/ObtenerPaises.handler'
import { PaisORM } from '../persistencia/Pais.orm'
import { ControladorUbicaciones } from './ubicaciones.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerObtenerPaises]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaisORM])],
  controllers: [ControladorUbicaciones],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloUbicaciones {}
