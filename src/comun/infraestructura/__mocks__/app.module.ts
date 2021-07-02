import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloEmpleado } from '../../../empleado/infraestructura/api/empleado.module'
import { ModuloEmpleador } from '../../../empleador/infraestructura/api/empleador.module'
import { ModuloUbicaciones } from '../api/ubicaciones.module'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { DireccionORM } from '../persistencia/Direccion.orm'
import { EmpleadoORM } from '../persistencia/Empleado.orm'
import { EmpresaORM } from '../persistencia/Empresa.orm'
import { EstadoORM } from '../persistencia/Estado.orm'
import { OfertaLaboralORM } from '../persistencia/OfertaLaboral.orm'
import { PaisORM } from '../persistencia/Pais.orm'
import { PostulacionOfertaORM } from '../persistencia/PostulacionOferta.orm'

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
      dropSchema: true,
    }),
    ModuloEmpleador,
    ModuloUbicaciones,
    ModuloEmpleado,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
