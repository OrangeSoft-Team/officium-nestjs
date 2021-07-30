import { DatosRestaurarListaCursos } from '../../dominio/servicios/RestaurarCurso'
import { EstatusCurso } from '../../dominio/values/curso/EstatusCurso'
import { FechaCreacionCurso } from '../../dominio/values/curso/FechaCreacionCurso'
import { IdentificadorCurso } from '../../dominio/values/curso/IdentificadorCurso'
import { TituloCurso } from '../../dominio/values/curso/TituloCurso'
import { ConsultarListaCursosRespuestaDTO } from '../dto/queries/ConsultarListaCursos.query'
import { ListadoCursosPersistenciaDTO } from '../puertos/IRepositorioCursos'

export abstract class CursoMapeador {
  public static ConvertirListaCursosDominio(
    listaCursos: ListadoCursosPersistenciaDTO[],
  ): DatosRestaurarListaCursos[] {
    const cursos: DatosRestaurarListaCursos[] = listaCursos.map((curso) => {
      return {
        uuid: IdentificadorCurso.crear(curso.uuid),
        titulo: TituloCurso.crear(curso.titulo),
        estatus: EstatusCurso.crear(curso.estatus as any),
        fechaCreacion: FechaCreacionCurso.crear(curso.fechaCreacion),
      }
    })
    return cursos
  }

  public static ConvertirListaCursosRespuesta(
    listaCursos: DatosRestaurarListaCursos[],
  ): ConsultarListaCursosRespuestaDTO[] {
    const cursos: ConsultarListaCursosRespuestaDTO[] = listaCursos.map(
      (curso) => {
        return {
          uuid: curso.uuid.obtenerId(),
          titulo: curso.titulo.obtenerTitulo(),
          estatus: curso.estatus.obtenerEstatus(),
          fechaCreacion: curso.fechaCreacion.obtenerFecha(),
        }
      },
    )
    return cursos
  }
}
