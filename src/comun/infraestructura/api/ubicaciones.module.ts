import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerObtenerEstados } from '../cqrs/handlers/ObtenerEstados.handler'
import { HandlerObtenerPaises } from '../cqrs/handlers/ObtenerPaises.handler'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'
import { ControladorUbicaciones } from './ubicaciones.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerObtenerPaises, HandlerObtenerEstados]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaisORM, EstadoORM])],
  controllers: [ControladorUbicaciones],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloUbicaciones {}
