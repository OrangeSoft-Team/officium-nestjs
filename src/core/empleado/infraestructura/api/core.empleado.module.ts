import { Module } from '@nestjs/common'
import { ModuloAuthEmpleado } from './auth/auth.module'
import { ModuloExperienciasEmpleado } from './experiencias/experiencias.module'
import { ModuloHabilidadesEmpleado } from './habilidades/habilidades.module'
import { ModuloPerfilEmpleado } from './perfil/perfil.module'
import { ModuloRegistroEmpleado } from './registro/registro.module'

@Module({
  imports: [
    ModuloRegistroEmpleado,
    ModuloAuthEmpleado,
    ModuloExperienciasEmpleado,
    ModuloHabilidadesEmpleado,
    ModuloPerfilEmpleado,
  ],
})
export class ModuloCoreEmpleado {}
