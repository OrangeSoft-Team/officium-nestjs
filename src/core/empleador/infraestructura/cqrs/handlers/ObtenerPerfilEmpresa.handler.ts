import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioObtenerPerfilEmpresa } from '../../../aplicacion/servicios/ServicioObtenerPerfilEmpresa'
import { RepositorioDirecciones } from '../../adaptadores/RepositorioDirecciones'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { QueryObtenerPerfilEmpresa } from '../queries/ObtenerPerfilEmpresa.query'

@QueryHandler(QueryObtenerPerfilEmpresa)
export class HandlerObtenerPerfilEmpresa implements IQueryHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas
  private readonly repositorioDirecciones: RepositorioDirecciones
  private readonly repositorioHabilidades: RepositorioHabilidades

  private readonly servicioObtenerPerfilEmpresa: ServicioObtenerPerfilEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()
    this.repositorioDirecciones = new RepositorioDirecciones()
    this.repositorioHabilidades = new RepositorioHabilidades()

    this.servicioObtenerPerfilEmpresa = new ServicioObtenerPerfilEmpresa(
      this.repositorioEmpresas,
      this.repositorioDirecciones,
      this.repositorioHabilidades,
    )
  }

  public async execute(query: QueryObtenerPerfilEmpresa) {
    return this.servicioObtenerPerfilEmpresa.ejecutar(
      EmpresaApiMapeador.convertirQueryObtenerPerfilEmpresa(query),
    )
  }
}
