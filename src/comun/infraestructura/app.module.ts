import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloCoreAdministrador } from '../../core/administrador/infraestructura/api/core.administrador.module'
import { ModuloCoreEmpleado } from '../../core/empleado/infraestructura/api/core.empleado.module'
import { ModuloCoreEmpleador } from '../../core/empleador/infraestructura/api/core.empleador.module'
import { ModuloMoocAdministrador } from '../../mooc/administrador/infraestructura/api/mooc.administrador.module'
import { ModuloMoocEmpleado } from '../../mooc/empleado/infraestructura/api/mooc.empleado.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: <any>process.env.TIPO_BD,
      host: process.env.RUTA_BD,
      port: parseInt(process.env.PUERTO_BD),
      username: process.env.USUARIO_BD,
      password: process.env.CLAVE_BD,
      database: process.env.NOMBRE_BD,
      entities: [],
      synchronize: false,
    }),
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
