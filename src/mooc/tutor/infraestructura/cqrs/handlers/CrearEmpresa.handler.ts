import { HttpException, HttpStatus } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../../comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioAgregarCurso } from '../../../aplicacion/servicios/ServicioAgregarCurso'
import { RepositorioCursos } from '../../adaptadores/RepositorioCursos'
import { CursoApiMapeador } from '../../mapeadores/Curso.api.mapeador'
import { ComandoCrearCurso } from '../comandos/CrearCurso.comando'
import { RepositorioHabilidades } from '../../adaptadores/__mocks__/RepositorioHabilidades';

@CommandHandler(ComandoCrearCurso)
export class HandlerCrearEmpresa implements ICommandHandler {
  private readonly repositorioCursos: RepositorioCursos
  private readonly busEventos: BusEventos
  private readonly servicioIdentificador: ServicioIdentificador
  private readonly RepositorioHabilidades: RepositorioHabilidades
  private readonly crearCurso: ServicioAgregarCurso

  public constructor() {
    this.repositorioCursos = new RepositorioCursos()
    this.RepositorioHabilidades = new RepositorioHabilidades()
    this.busEventos = new BusEventos()
    this.servicioIdentificador = new ServicioIdentificador()

    this.crearCurso = new ServicioAgregarCurso(
      this.repositorioCursos,
      this.RepositorioHabilidades,
      this.servicioIdentificador,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoCrearCurso) {
    return this.crearCurso.ejecutar(
      CursoApiMapeador.convertirComandoCrearCurso(comando),
    )
  }
}
