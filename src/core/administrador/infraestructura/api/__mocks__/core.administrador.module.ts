import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloAuthAdministrador } from '../auth/auth.module'
import { ModuloEmpresasAdministrador } from '../empresas/empresas.module'
import { ModuloPerfilAdministrador } from '../perfil/perfil.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: <any>process.env.TIPO_BD_TESTING,
      host: process.env.RUTA_BD_TESTING,
      port: parseInt(process.env.PUERTO_BD_TESTING),
      username: process.env.USUARIO_BD_TESTING,
      password: process.env.CLAVE_BD_TESTING,
      database: process.env.NOMBRE_BD_TESTING,
      entities: ['src/core/administrador/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    }),
    ModuloAuthAdministrador,
    ModuloPerfilAdministrador,
    ModuloEmpresasAdministrador,
  ],
})
export class ModuloCoreAdministrador {}
