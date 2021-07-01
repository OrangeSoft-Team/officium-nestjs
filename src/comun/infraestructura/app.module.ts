import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloEmpleado } from '../../empleado/infraestructura/api/empleado.module'
import { ModuloEmpleador } from '../../empleador/infraestructura/api/empleador.module'
import { ModuloUbicaciones } from './api/ubicaciones.module'
import { CiudadORM } from './persistencia/Ciudad.orm'
import { DireccionORM } from './persistencia/Direccion.orm'
import { EmpresaORM } from './persistencia/Empresa.orm'
import { EstadoORM } from './persistencia/Estado.orm'
import { OfertaLaboralORM } from './persistencia/OfertaLaboral.orm'
import { PaisORM } from './persistencia/Pais.orm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RUTA_BD,
      port: parseInt(process.env.PUERTO_BD),
      username: process.env.USUARIO_BD,
      password: process.env.CLAVE_BD,
      database: process.env.NOMBRE_BD,
      entities: [
        EmpresaORM,
        OfertaLaboralORM,
        DireccionORM,
        PaisORM,
        EstadoORM,
        CiudadORM,
      ],
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
