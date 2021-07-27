import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioVerListaEmpresas } from '../../../aplicacion/servicios/ServicioVerListaEmpresas'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { QueryVerListaEmpresas } from '../queries/VerListaEmpresas.query'

@QueryHandler(QueryVerListaEmpresas)
export class HandlerVerListaEmpresas implements IQueryHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas

  private readonly verListaEmpresas: ServicioVerListaEmpresas

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()

    this.verListaEmpresas = new ServicioVerListaEmpresas(
      this.repositorioEmpresas,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(query: QueryVerListaEmpresas) {
    return this.verListaEmpresas.ejecutar()
  }
}
