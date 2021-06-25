import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmpresaORM } from '../../empleador/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../empleador/infraestructura/persistencia/OfertaLaboral.orm'

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
