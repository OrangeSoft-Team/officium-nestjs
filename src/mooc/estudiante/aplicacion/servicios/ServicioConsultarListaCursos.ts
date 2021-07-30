import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { ConsultarListaCursosRespuestaDTO } from '../dto/queries/ConsultarListaCursos.query'
import { CursoMapeador } from '../mapeadores/Curso.mapeador'
import { IRepositorioCursos } from '../puertos/IRepositorioCursos'

export class ServicioConsultarListaCursos implements IServicioAplicacion {
  public constructor(private readonly repositorioCursos: IRepositorioCursos) {}

  public async ejecutar(): Promise<Resultado<any>> {
    try {
      const listaCursosPersistencia = await this.repositorioCursos.listar()
      const listaCursosDominio = CursoMapeador.ConvertirListaCursosDominio(
        listaCursosPersistencia,
      )
      const respuesta =
        CursoMapeador.ConvertirListaCursosRespuesta(listaCursosDominio)
      return Resultado.ok<ConsultarListaCursosRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
