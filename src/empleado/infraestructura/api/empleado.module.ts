import { Module } from '@nestjs/common'
import { ModuloOfertasLaborales } from './ofertas/ofertas.module'
import { ModuloPostulaciones } from './postulaciones/postulaciones.module'

@Module({
  imports: [ModuloOfertasLaborales, ModuloPostulaciones],
  controllers: [],
})
export class ModuloEmpleado {}
