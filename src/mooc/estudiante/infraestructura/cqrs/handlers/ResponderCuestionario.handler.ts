import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioResponderCuestionario } from '../../../aplicacion/servicios/ServicioResponderCuestionario'
import { RepositorioCursos } from '../../adaptadores/RepositorioCursos'
import { RepositorioEstudiantes } from '../../adaptadores/RepositorioEstudiantes'
import { RepositorioRespuestas } from '../../adaptadores/RepositorioRespuestas'
import { ComandoResponderCuestionario } from '../comandos/ResponderCuestionario.comando'

@CommandHandler(ComandoResponderCuestionario)
export class HandlerResponderCuestionario implements ICommandHandler {
  private readonly repositorioCursos: RepositorioCursos
  private readonly repositorioEstudiantes: RepositorioEstudiantes
  private readonly repositorioRespuestas: RepositorioRespuestas
  private readonly busEventos: BusEventos
  private readonly responderCuestionario: ServicioResponderCuestionario

  public constructor() {
    this.repositorioCursos = new RepositorioCursos()
    this.repositorioEstudiantes = new RepositorioEstudiantes()
    this.repositorioRespuestas = new RepositorioRespuestas()
    this.busEventos = new BusEventos()
    this.responderCuestionario = new ServicioResponderCuestionario(
      this.repositorioRespuestas,
      this.repositorioEstudiantes,
      this.repositorioCursos,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoResponderCuestionario) {
    return this.responderCuestionario.ejecutar(comando.datos)
  }
}
