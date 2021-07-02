import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloEmpleado } from '../../empleado/infraestructura/api/empleado.module'
import { ModuloEmpleador } from '../../empleador/infraestructura/api/empleador.module'
import { ModuloUbicaciones } from './api/ubicaciones.module'

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
      entities: ['dist/comun/infraestructura/persistencia/*'],
      synchronize: true,
    }),
    ModuloEmpleador,
    ModuloUbicaciones,
    ModuloEmpleado,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
