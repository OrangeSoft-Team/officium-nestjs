import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioConsultarListaCursos } from '../../../aplicacion/servicios/ServicioConsultarListaCursos'
import { RepositorioCursos } from '../../adaptadores/RepositorioCursos'
import { QueryConsultarListaCursos } from '../queries/ConsultarListaCursos.query'

@QueryHandler(QueryConsultarListaCursos)
export class HandlerColsultarListaCursos implements IQueryHandler {
  private readonly repositorioCursos: RepositorioCursos
  private readonly consultarListaCursos: ServicioConsultarListaCursos

  public constructor() {
    this.repositorioCursos = new RepositorioCursos()
    this.consultarListaCursos = new ServicioConsultarListaCursos(
      this.repositorioCursos,
    )
  }

  public async execute(query: QueryConsultarListaCursos) {
    return this.consultarListaCursos.ejecutar()
  }
}
