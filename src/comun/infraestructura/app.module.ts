import { Module } from '@nestjs/common'
import { ModuloCoreAdministrador } from '../../core/administrador/infraestructura/api/core.administrador.module'
import { ModuloCoreEmpleado } from '../../core/empleado/infraestructura/api/core.empleado.module'
import { ModuloCoreEmpleador } from '../../core/empleador/infraestructura/api/core.empleador.module'
import { ModuloMoocAdministrador } from '../../mooc/administrador/infraestructura/api/mooc.administrador.module'
import { ModuloMoocEmpleado } from '../../mooc/empleado/infraestructura/api/mooc.empleado.module'

@Module({
  imports: [
    ModuloCoreEmpleador,
    ModuloCoreEmpleado,
    ModuloCoreAdministrador,
    ModuloMoocEmpleado,
    ModuloMoocAdministrador,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
