import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioConsultarExperienciasLaboralesEmpleado } from '../../../aplicacion/servicios/ServicioConsultarExperienciasLaboralesEmpleado'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../adaptadores/RepositorioExperienciasLaborales'
import { ExperienciaLaboralApiMapeador } from '../../mapeadores/ExperienciaLaboral.api.mapeador'
import { QueryConsultarExperienciasLaboralesEmpleado } from '../queries/ConsultarExperienciasLaboralesEmpleado.query'

@QueryHandler(QueryConsultarExperienciasLaboralesEmpleado)
export class HandlerConsultarExperienciasLaboralesEmpleado
  implements IQueryHandler
{
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioExperienciasLaborales: RepositorioExperienciasLaborales

  private readonly consultarExperienciaLaboralEmpleado: ServicioConsultarExperienciasLaboralesEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()

    this.consultarExperienciaLaboralEmpleado =
      new ServicioConsultarExperienciasLaboralesEmpleado(
        this.repositorioExperienciasLaborales,
        this.repositorioEmpleados,
      )
  }

  public async execute(query: QueryConsultarExperienciasLaboralesEmpleado) {
    return this.consultarExperienciaLaboralEmpleado.ejecutar(
      ExperienciaLaboralApiMapeador.convertirQueryConsultarExperienciasLaborales(
        query,
      ),
    )
  }
}
