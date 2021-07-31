import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerPaises } from '../../../aplicacion/servicios/ServicioObtenerPaises'
import { RepositorioUbicaciones } from '../../adaptadores/RepositorioUbicaciones'
import { QueryObtenerPaises } from '../queries/ObtenerPaises.query'

@QueryHandler(QueryObtenerPaises)
export class HandlerObtenerPaises implements IQueryHandler {
  private readonly repositorioUbicaciones: RepositorioUbicaciones

  private readonly obtenerPaises: ServicioObtenerPaises

  public constructor() {
    this.repositorioUbicaciones = new RepositorioUbicaciones()

    this.obtenerPaises = new ServicioObtenerPaises(this.repositorioUbicaciones)
  }

  public async execute() {
    return this.obtenerPaises.ejecutar()
  }
}
