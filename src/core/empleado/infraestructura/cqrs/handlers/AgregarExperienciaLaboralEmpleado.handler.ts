import { CommandHandler, IQueryHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../../comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioAgregarExperienciaLaboralEmpleado } from '../../../aplicacion/servicios/ServicioAgregarExperienciaLaboralEmpleado'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../adaptadores/RepositorioExperienciasLaborales'
import { ExperienciaLaboralApiMapeador } from '../../mapeadores/ExperienciaLaboral.api.mapeador'
import { ComandoAgregarExperienciaLaboral } from '../comandos/AgregarExperienciaLaboralEmpleado.comando'

@CommandHandler(ComandoAgregarExperienciaLaboral)
export class HandlerAgregarExperienciaLaboralEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioExperienciasLaborales: RepositorioExperienciasLaborales
  private readonly busEventos: BusEventos
  private readonly servicioIdentificador: ServicioIdentificador

  private readonly agregarExperienciaLaboralEmpleado: ServicioAgregarExperienciaLaboralEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    this.busEventos = BusEventos.obtenerInstancia()
    this.servicioIdentificador = new ServicioIdentificador()

    this.agregarExperienciaLaboralEmpleado =
      new ServicioAgregarExperienciaLaboralEmpleado(
        this.repositorioExperienciasLaborales,
        this.repositorioEmpleados,
        this.servicioIdentificador,
        this.busEventos,
      )
  }

  public async execute(comando: ComandoAgregarExperienciaLaboral) {
    return this.agregarExperienciaLaboralEmpleado.ejecutar(
      ExperienciaLaboralApiMapeador.convertirComandoAgregarExperienciaLaboral(
        comando,
      ),
    )
  }
}
