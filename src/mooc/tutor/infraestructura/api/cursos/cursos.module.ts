import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HabilidadORM } from '../../persistencia/Habilidad.orm'
import { ControladorCursosTutor } from './cursos.controller'

const ManejadoresComandos = []


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      HabilidadORM,
    ]),
  ],
  controllers: [ControladorCursosTutor],
  providers: [],
})
export class ModuloEmpleadosAdministrador {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareSesion)
      .forRoutes(ControladorCursosTutor)
  }
}
