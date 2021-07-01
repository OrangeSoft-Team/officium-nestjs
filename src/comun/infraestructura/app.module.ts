import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloAdministrador } from '../../administrador/infraestructura/api/administrador.module'
import { ModuloEmpleado } from '../../empleado/infraestructura/api/empleado.module'
import { ModuloEmpleador } from '../../empleador/infraestructura/api/empleador.module'
import { ModuloUbicaciones } from './api/ubicaciones.module'
import { CiudadORM } from './persistencia/Ciudad.orm'
import { DireccionORM } from './persistencia/Direccion.orm'
import { EmpleadoORM } from './persistencia/Empleado.orm'
import { EmpresaORM } from './persistencia/Empresa.orm'
import { EstadoORM } from './persistencia/Estado.orm'
import { OfertaLaboralORM } from './persistencia/OfertaLaboral.orm'
import { PaisORM } from './persistencia/Pais.orm'
import { PostulacionOfertaORM } from './persistencia/PostulacionOferta.orm'

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
        PaisORM,
        EstadoORM,
        CiudadORM,
        DireccionORM,
        EmpleadoORM,
        PostulacionOfertaORM,
      ],
      synchronize: true,
    }),
    ModuloEmpleador,
    ModuloUbicaciones,
    ModuloEmpleado,
    ModuloAdministrador
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
