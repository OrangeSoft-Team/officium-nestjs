import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioConsultarHabilidadesEmpleado } from '../../../aplicacion/servicios/ServicioConsultarHabilidadesEmpleado'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { HabilidadApiMapeador } from '../../mapeadores/Habilidad.api.mapeador'
import { QueryConsultarHabilidadesEmpleado } from '../queries/ConsultarHabilidadesEmpleado.query'

@QueryHandler(QueryConsultarHabilidadesEmpleado)
export class HandlerConsultarHabilidadesEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioHabilidades: RepositorioHabilidades

  private readonly consultarHabilidadesEmpleado: ServicioConsultarHabilidadesEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioHabilidades = new RepositorioHabilidades()

    this.consultarHabilidadesEmpleado =
      new ServicioConsultarHabilidadesEmpleado(
        this.repositorioEmpleados,
        this.repositorioHabilidades,
      )
  }

  public async execute(query: QueryConsultarHabilidadesEmpleado) {
    return this.consultarHabilidadesEmpleado.ejecutar(
      HabilidadApiMapeador.convertirQueryConsultarHabilidades(query),
    )
  }
}
