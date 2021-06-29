import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorEstados } from './estados.controller'
import { ServicioEstados } from './estados.service'

@Module({
  imports: [TypeOrmModule.forFeature([PaisORM, EstadoORM])],
  controllers: [ControladorEstados],
  providers: [ServicioEstados],
})
export class ModuloEstados {}
