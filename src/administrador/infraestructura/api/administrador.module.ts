import { Module } from '@nestjs/common'
import { ModuloOfertasLaborales } from './ofertas/ofertas.module'

@Module({
  imports: [ModuloOfertasLaborales],
  controllers: [],
})
export class ModuloAdministrador {}
