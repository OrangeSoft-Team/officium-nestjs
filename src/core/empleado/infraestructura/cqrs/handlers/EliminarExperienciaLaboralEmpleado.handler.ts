import { CommandHandler, IQueryHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioEliminarExperienciaLaboralEmpleado } from '../../../aplicacion/servicios/ServicioEliminarExperienciaLaboral'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../adaptadores/RepositorioExperienciasLaborales'
import { ExperienciaLaboralApiMapeador } from '../../mapeadores/ExperienciaLaboral.api.mapeador'
import { ComandoEliminarExperienciaLaboral } from '../comandos/EliminarExperienciaLaboralEmpleado.comando'

@CommandHandler(ComandoEliminarExperienciaLaboral)
export class HandlerEliminarExperienciaLaboralEmpleado
  implements IQueryHandler
{
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioExperienciasLaborales: RepositorioExperienciasLaborales
  private readonly busEventos: BusEventos

  private readonly eliminarExperienciaLaboralEmpleado: ServicioEliminarExperienciaLaboralEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    this.busEventos = BusEventos.obtenerInstancia()

    this.eliminarExperienciaLaboralEmpleado =
      new ServicioEliminarExperienciaLaboralEmpleado(
        this.repositorioExperienciasLaborales,
        this.repositorioEmpleados,
        this.busEventos,
      )
  }

  public async execute(comando: ComandoEliminarExperienciaLaboral) {
    return this.eliminarExperienciaLaboralEmpleado.ejecutar(
      ExperienciaLaboralApiMapeador.convertirComandoEliminarExperienciaLaboral(
        comando,
      ),
    )
  }
}
