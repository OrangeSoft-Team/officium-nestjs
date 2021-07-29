import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ServicioListarEmpleados } from '../../../aplicacion/servicios/ServicioListarEmpleados'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { QueryListarEmpleados } from '../queries/ListarEmpleados.query'

@QueryHandler(QueryListarEmpleados)
export class HandlerListarEmpleados implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados

  private readonly listarEmpleados: ServicioListarEmpleados

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()

    this.listarEmpleados = new ServicioListarEmpleados(
      this.repositorioEmpleados,
    )
  }

  public async execute() {
    return this.listarEmpleados.ejecutar()
  }
}
