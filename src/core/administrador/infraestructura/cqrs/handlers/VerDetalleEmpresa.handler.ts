import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioVerDetalleEmpresa } from '../../../aplicacion/servicios/ServicioVerDetalleEmpresa'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { QueryVerDetalleEmpresa } from '../queries/VerDetalleEmpresa.query'

@QueryHandler(QueryVerDetalleEmpresa)
export class HandlerVerDetalleEmpresas implements IQueryHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas

  private readonly verDetalleEmpresas: ServicioVerDetalleEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()

    this.verDetalleEmpresas = new ServicioVerDetalleEmpresa(
      this.repositorioEmpresas,
    )
  }

  public async execute(query: QueryVerDetalleEmpresa) {
    return this.verDetalleEmpresas.ejecutar(
      EmpresaApiMapeador.convertirQueryVerDetalleEmpresa(query),
    )
  }
}
