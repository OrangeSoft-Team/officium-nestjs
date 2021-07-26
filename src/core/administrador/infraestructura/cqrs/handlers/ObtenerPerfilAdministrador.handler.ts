import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerPerfilAdministrador } from '../../../aplicacion/servicios/ServicioObtenerPerfilAdministrador'
import { RepositorioAdministradores } from '../../adaptadores/RepositorioAdministradores'
import { AdministradorApiMapeador } from '../../mapeadores/Administrador.api.mapeador'
import { QueryObtenerPerfilAdministrador } from '../queries/ObtenerPerfilAdministrador.query'

@QueryHandler(QueryObtenerPerfilAdministrador)
export class HandlerObtenerPerfilAdministrador implements IQueryHandler {
  private readonly repositorioAdministradores: RepositorioAdministradores

  private readonly obtenerPerfilAdministrador: ServicioObtenerPerfilAdministrador

  public constructor() {
    this.repositorioAdministradores = new RepositorioAdministradores()

    this.obtenerPerfilAdministrador = new ServicioObtenerPerfilAdministrador(
      this.repositorioAdministradores,
    )
  }

  public async execute(query: QueryObtenerPerfilAdministrador) {
    return this.obtenerPerfilAdministrador.ejecutar(
      AdministradorApiMapeador.convertirQueryObtenerPerfilAdministrador(query),
    )
  }
}
