import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { ControladorOfertasLaborales } from './ofertas.controller'
import { ServicioOfertasLaborales } from './ofertas.service'

@Module({
  imports: [TypeOrmModule.forFeature([OfertaLaboralORM,])],
  controllers: [ControladorOfertasLaborales],
  providers: [ServicioOfertasLaborales],
})
export class ModuloOfertasLaborales {}
