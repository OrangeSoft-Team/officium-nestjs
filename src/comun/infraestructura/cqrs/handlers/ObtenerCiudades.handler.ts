import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerCiudades } from '../../../aplicacion/servicios/ServicioObtenerCiudades'
import { RepositorioUbicaciones } from '../../adaptadores/RepositorioUbicaciones'
import { UbicacionApiMapeador } from '../../mapeadores/Ubicacion.mapeador'
import { QueryObtenerCiudades } from '../queries/ObtenerCiudades.query'

@QueryHandler(QueryObtenerCiudades)
export class HandlerObtenerCiudades implements IQueryHandler {
  private readonly repositorioUbicaciones: RepositorioUbicaciones

  private readonly obtenerCiudades: ServicioObtenerCiudades

  public constructor() {
    this.repositorioUbicaciones = new RepositorioUbicaciones()

    this.obtenerCiudades = new ServicioObtenerCiudades(
      this.repositorioUbicaciones,
    )
  }

  public async execute(query: QueryObtenerCiudades) {
    return this.obtenerCiudades.ejecutar(
      UbicacionApiMapeador.convertirQueryObtenerCiudades(query),
    )
  }
}
