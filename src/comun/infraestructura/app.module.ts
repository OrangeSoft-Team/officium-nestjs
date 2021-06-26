import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuloEmpleador } from '../../empleador/infraestructura/api/empleador.module'
import { EmpresaORM } from './persistencia/Empresa.orm'
import { OfertaLaboralORM } from './persistencia/OfertaLaboral.orm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [EmpresaORM, OfertaLaboralORM],
      synchronize: true,
    }),
    ModuloEmpleador,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
