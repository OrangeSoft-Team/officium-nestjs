import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloRegistroEmpleado } from './registro/registro.module'

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
      entities: ['dist/core/empleado/infraestructura/persistencia/*'],
      synchronize: false,
    }),
    ModuloRegistroEmpleado,
  ],
})
export class ModuloCoreEmpleado {}
