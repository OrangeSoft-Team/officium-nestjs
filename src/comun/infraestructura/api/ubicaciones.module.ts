import { Module } from '@nestjs/common'
import { ModuloCiudades } from './ciudades/ciudades.module'
import { ModuloEstados } from './estados/estados.module'
import { ModuloPaises } from './paises/paises.module'

@Module({
  imports: [ModuloPaises, ModuloEstados, ModuloCiudades],
  controllers: [],
})
export class ModuloUbicaciones {}
