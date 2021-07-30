import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioVerPerfilEmpleado } from '../../../aplicacion/servicios/ServicioVerPerfilEmpleado'
import { RepositorioDirecciones } from '../../adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../adaptadores/RepositorioExperienciasLaborales'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { QueryVerPerfilEmpleado } from '../queries/VerPerfilEmpleado.query'

@QueryHandler(QueryVerPerfilEmpleado)
export class HandlerVerPerfilEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioDirecciones: RepositorioDirecciones
  private readonly repositorioExperienciasLaborales: RepositorioExperienciasLaborales
  private readonly repositorioHabilidades: RepositorioHabilidades

  private readonly verPerfilEmpleado: ServicioVerPerfilEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioDirecciones = new RepositorioDirecciones()
    this.repositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    this.repositorioHabilidades = new RepositorioHabilidades()

    this.verPerfilEmpleado = new ServicioVerPerfilEmpleado(
      this.repositorioEmpleados,
      this.repositorioExperienciasLaborales,
      this.repositorioHabilidades,
      this.repositorioDirecciones,
    )
  }

  public async execute(query: QueryVerPerfilEmpleado) {
    return this.verPerfilEmpleado.ejecutar(
      EmpleadoApiMapeador.convertirQueryVerPerfilEmpleado(query),
    )
  }
}
