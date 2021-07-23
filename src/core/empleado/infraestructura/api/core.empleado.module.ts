import { Module } from '@nestjs/common'
import { ModuloAuthEmpleado } from './auth/auth.module'
import { ModuloExperienciasEmpleado } from './experiencias/experiencias.module'
import { ModuloHabilidadesEmpleado } from './habilidades/habilidades.module'
import { ModuloRegistroEmpleado } from './registro/registro.module'

@Module({
  imports: [
    ModuloRegistroEmpleado,
    ModuloAuthEmpleado,
    ModuloExperienciasEmpleado,
    ModuloHabilidadesEmpleado,
  ],
})
export class ModuloCoreEmpleado {}
