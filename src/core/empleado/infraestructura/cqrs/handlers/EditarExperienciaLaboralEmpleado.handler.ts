import { CommandHandler, IQueryHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioEditarExperienciaLaboralEmpleado } from '../../../aplicacion/servicios/ServicioEditarExperienciaLaboral'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../adaptadores/RepositorioExperienciasLaborales'
import { ExperienciaLaboralApiMapeador } from '../../mapeadores/ExperienciaLaboral.api.mapeador'
import { ComandoEditarExperienciaLaboral } from '../comandos/EditarExperienciaLaboralEmpleado.comando'

@CommandHandler(ComandoEditarExperienciaLaboral)
export class HandlerEditarExperienciaLaboralEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioExperienciasLaborales: RepositorioExperienciasLaborales
  private readonly busEventos: BusEventos

  private readonly editarExperienciaLaboralEmpleado: ServicioEditarExperienciaLaboralEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    this.busEventos = BusEventos.obtenerInstancia()

    this.editarExperienciaLaboralEmpleado =
      new ServicioEditarExperienciaLaboralEmpleado(
        this.repositorioExperienciasLaborales,
        this.repositorioEmpleados,
        this.busEventos,
      )
  }

  public async execute(comando: ComandoEditarExperienciaLaboral) {
    return this.editarExperienciaLaboralEmpleado.ejecutar(
      ExperienciaLaboralApiMapeador.convertirComandoEditarExperienciaLaboral(
        comando,
      ),
    )
  }
}
