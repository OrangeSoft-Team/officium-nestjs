import { Module } from '@nestjs/common'
import { ModuloAuthEmpleado } from './auth/auth.module'
import { ModuloExperienciasEmpleado } from './experiencias/experiencias.module'
import { ModuloRegistroEmpleado } from './registro/registro.module'

@Module({
  imports: [
    ModuloRegistroEmpleado,
    ModuloAuthEmpleado,
    ModuloExperienciasEmpleado,
  ],
})
export class ModuloCoreEmpleado {}
