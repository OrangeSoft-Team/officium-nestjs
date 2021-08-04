import { CommandHandler, IQueryHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioActualizarHabilidadesEmpleado } from '../../../aplicacion/servicios/ServicioActualizarHabilidadesEmpleado'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { HabilidadApiMapeador } from '../../mapeadores/Habilidad.api.mapeador'
import { ComandoActualizarHabilidadesEmpleado } from '../comandos/ActualizarHabilidadesEmpleado.comando'

@CommandHandler(ComandoActualizarHabilidadesEmpleado)
export class HandlerActualizarHabilidadesEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly repositorioHabilidades: RepositorioHabilidades
  private readonly busEventos: BusEventos

  private readonly actualizarHabilidadesEmpleado: ServicioActualizarHabilidadesEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.repositorioHabilidades = new RepositorioHabilidades()
    this.busEventos = BusEventos.obtenerInstancia()
    this.actualizarHabilidadesEmpleado =
      new ServicioActualizarHabilidadesEmpleado(
        this.repositorioEmpleados,
        this.repositorioHabilidades,
        this.busEventos,
      )
  }

  public async execute(comando: ComandoActualizarHabilidadesEmpleado) {
    return this.actualizarHabilidadesEmpleado.ejecutar(
      HabilidadApiMapeador.convertirComandoActualizarHabilidades(comando),
    )
  }
}
