import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerEstados } from '../../../aplicacion/servicios/ServicioObtenerEstados'
import { RepositorioUbicaciones } from '../../adaptadores/RepositorioUbicaciones'
import { UbicacionApiMapeador } from '../../mapeadores/Ubicacion.mapeador'
import { QueryObtenerEstados } from '../queries/ObtenerEstados.query'

@QueryHandler(QueryObtenerEstados)
export class HandlerObtenerEstados implements IQueryHandler {
  private readonly repositorioUbicaciones: RepositorioUbicaciones

  private readonly obtenerEstados: ServicioObtenerEstados

  public constructor() {
    this.repositorioUbicaciones = new RepositorioUbicaciones()

    this.obtenerEstados = new ServicioObtenerEstados(
      this.repositorioUbicaciones,
    )
  }

  public async execute(query: QueryObtenerEstados) {
    return this.obtenerEstados.ejecutar(
      UbicacionApiMapeador.convertirQueryObtenerEstados(query),
    )
  }
}
