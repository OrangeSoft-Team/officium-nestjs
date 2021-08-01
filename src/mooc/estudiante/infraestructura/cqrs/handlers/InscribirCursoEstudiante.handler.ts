import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioInscribirCursoEstudiante } from '../../../aplicacion/servicios/ServicioInscribirCursoEstudiante'
import { RepositorioCursos } from '../../adaptadores/RepositorioCursos'
import { RepositorioEstudiantes } from '../../adaptadores/RepositorioEstudiantes'
import { ComandoInscribirCursoEstudiante } from '../comandos/InscribirCursoEstudiante.comando'

@CommandHandler(ComandoInscribirCursoEstudiante)
export class HandlerInscribirCursoEstudiante implements ICommandHandler {
  private readonly repositorioCursos: RepositorioCursos
  private readonly repositorioEstudiantes: RepositorioEstudiantes
  private readonly busEventos: BusEventos
  private readonly inscribirCurso: ServicioInscribirCursoEstudiante

  public constructor() {
    this.repositorioCursos = new RepositorioCursos()
    this.repositorioEstudiantes = new RepositorioEstudiantes()
    this.busEventos = new BusEventos()
    this.inscribirCurso = new ServicioInscribirCursoEstudiante(
      this.repositorioEstudiantes,
      this.repositorioCursos,
      this.busEventos,
    )
  }

  public async execute(query: ComandoInscribirCursoEstudiante) {
    return this.inscribirCurso.ejecutar(query.datos)
  }
}