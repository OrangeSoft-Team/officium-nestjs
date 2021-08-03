import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioVerPerfilEmpleado } from '../../../aplicacion/servicios/ServicioVerPerfilEmpleado'
import { RepositorioDirecciones } from '../../adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { QueryVerPerfilEmpleadoActual } from '../queries/VerPerfilEmpleado.query'

@QueryHandler(QueryVerPerfilEmpleadoActual)
export class HandlerVerPerfilEmpleadoActual implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioDirecciones: RepositorioDirecciones

  private readonly verPerfilEmpleado: ServicioVerPerfilEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioDirecciones = new RepositorioDirecciones()

    this.verPerfilEmpleado = new ServicioVerPerfilEmpleado(
      this.repositorioEmpleados,
      this.repositorioDirecciones,
    )
  }

  public async execute(query: QueryVerPerfilEmpleadoActual) {
    return this.verPerfilEmpleado.ejecutar(
      EmpleadoApiMapeador.convertirQueryVerPerfilEmpleado(query),
    )
  }
}
