import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloCoreAdministrador } from '../../core/administrador/infraestructura/api/core.administrador.module'
import { ModuloCoreEmpleado } from '../../core/empleado/infraestructura/api/core.empleado.module'
import { ModuloCoreEmpleador } from '../../core/empleador/infraestructura/api/core.empleador.module'
import { ModuloMoocAdministrador } from '../../mooc/administrador/infraestructura/api/mooc.administrador.module'
import { ModuloMoocEmpleado } from '../../mooc/estudiante/infraestructura/api/mooc.empleado.module'
import { ModuloHabilidades } from './api/habilidades.module'
import { ModuloUbicaciones } from './api/ubicaciones.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: <any>process.env.TIPO_BD,
      host: process.env.RUTA_BD,
      port: parseInt(process.env.PUERTO_BD),
      username: process.env.USUARIO_BD,
      password: process.env.CLAVE_BD,
      database: process.env.NOMBRE_BD,
      entities: [
        'dist/core/empleado/infraestructura/persistencia/*',
        'dist/core/empleador/infraestructura/persistencia/*',
        'dist/core/administrador/infraestructura/persistencia/*',
        'dist/mooc/estudiante/infraestructura/persistencia/*',
        'dist/comun/infraestructura/persistencia/*',
      ],
      synchronize: false,
    }),
    ModuloCoreEmpleado,
    ModuloCoreEmpleador,
    ModuloCoreAdministrador,
    ModuloMoocEmpleado,
    ModuloMoocAdministrador,
    ModuloUbicaciones,
    ModuloHabilidades,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
