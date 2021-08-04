import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerConsultarCuestionario } from '../../cqrs/handlers/ConsultarCuestionario.handler'
import { HandlerConsultarDetalleCurso } from '../../cqrs/handlers/ConsultarDetalleCurso.handler'
import { HandlerColsultarListaCursos } from '../../cqrs/handlers/ConsultarListaCursos.handler'
import { HandlerInscribirCursoEstudiante } from '../../cqrs/handlers/InscribirCursoEstudiante.handler'
import { HandlerResponderCuestionario } from '../../cqrs/handlers/ResponderCuestionario.handler'
import { HandlerVerLeccion } from '../../cqrs/handlers/VerLeccion.handler'
import { CursoORM } from '../../persistencia/Curso.orm'
import { ControladorCursos } from './cursos.controller'

const ManejadoresComandos = [HandlerResponderCuestionario]

const ManejadoresQueries = [
  HandlerColsultarListaCursos,
  HandlerConsultarDetalleCurso,
  HandlerInscribirCursoEstudiante,
  HandlerVerLeccion,
  HandlerConsultarCuestionario,
]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CursoORM])],
  controllers: [ControladorCursos],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloCursos {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorCursos)
  }
}
