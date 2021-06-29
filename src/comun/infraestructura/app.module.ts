import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloEmpleador } from '../../empleador/infraestructura/api/empleador.module'
import { ModuloUbicaciones } from './api/ubicaciones.module'
import { CiudadORM } from './persistencia/Ciudad.orm'
import { EmpresaORM } from './persistencia/Empresa.orm'
import { EstadoORM } from './persistencia/Estado.orm'
import { OfertaLaboralORM } from './persistencia/OfertaLaboral.orm'
import { PaisORM } from './persistencia/Pais.orm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [EmpresaORM, OfertaLaboralORM, PaisORM, EstadoORM, CiudadORM],
      synchronize: true,
    }),
    ModuloEmpleador,
    ModuloUbicaciones,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
