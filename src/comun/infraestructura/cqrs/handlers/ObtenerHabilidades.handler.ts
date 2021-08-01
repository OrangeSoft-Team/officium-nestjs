import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerHabilidades } from '../../../aplicacion/servicios/ServicioObtenerHabilidades'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { QueryObtenerHabilidades } from '../queries/ObtenerHabilidades.query'

@QueryHandler(QueryObtenerHabilidades)
export class HandlerObtenerHabilidades implements IQueryHandler {
  private readonly repositorioHabilidades: RepositorioHabilidades

  private readonly obtenerHabilidades: ServicioObtenerHabilidades

  public constructor() {
    this.repositorioHabilidades = new RepositorioHabilidades()

    this.obtenerHabilidades = new ServicioObtenerHabilidades(
      this.repositorioHabilidades,
    )
  }

  public async execute() {
    return this.obtenerHabilidades.ejecutar()
  }
}
