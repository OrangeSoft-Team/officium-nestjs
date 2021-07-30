import { DatosRestaurarDetalleCurso, DatosRestaurarListaCursos } from '../../dominio/servicios/RestaurarCurso'
import { DuracionEstimadaCurso } from '../../dominio/values/curso/DuracionEstimadaCurso'
import { EstatusCurso } from '../../dominio/values/curso/EstatusCurso'
import { FechaCreacionCurso } from '../../dominio/values/curso/FechaCreacionCurso'
import { FechaUltimaModificacionCurso } from '../../dominio/values/curso/FechaUltimaModificacionCurso'
import { IdentificadorCurso } from '../../dominio/values/curso/IdentificadorCurso'
import { TituloCurso } from '../../dominio/values/curso/TituloCurso'
import { ConsultarDetalleCursoRespuestaDTO, HabilidadesRespuestaDTO, LeccionesRespuestaDTO } from '../dto/queries/ConsultarDetalleCurso.query'
import { ConsultarListaCursosRespuestaDTO } from '../dto/queries/ConsultarListaCursos.query'
import { CursoPersistenciaDTO, ListadoCursosPersistenciaDTO } from '../puertos/IRepositorioCursos'

export abstract class CursoMapeador {
  public static ConvertirListaCursosDominio(
    listaCursos: ListadoCursosPersistenciaDTO[],
  ): DatosRestaurarListaCursos[] {
    const cursos: DatosRestaurarListaCursos[] = listaCursos?.map((curso) => {
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
    const cursos: ConsultarListaCursosRespuestaDTO[] = listaCursos?.map(
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

  public static ConvertirDetalleCursoDominio(
    cursoPersistencia: CursoPersistenciaDTO
  ): DatosRestaurarDetalleCurso{
    return{
      uuid: IdentificadorCurso.crear(cursoPersistencia.uuid),
      titulo: TituloCurso.crear(cursoPersistencia.titulo),
      estatus: EstatusCurso.crear(cursoPersistencia.estatus as any),
      duracionEstimada: DuracionEstimadaCurso.crear(cursoPersistencia.escalaDuracion as any,
        cursoPersistencia.valorDuracion),
      fechaCreacion: FechaCreacionCurso.crear(cursoPersistencia.fechaCreacion),
      fechaUltimaModificacion: FechaUltimaModificacionCurso.crear(cursoPersistencia.fechaUltimaModificacion),
    }
  }

  public static ConvertirDetalleCursoRespuesta(
    cursoDominio: DatosRestaurarDetalleCurso,
    lecciones: LeccionesRespuestaDTO[],
    habilidades: HabilidadesRespuestaDTO[],
  ): ConsultarDetalleCursoRespuestaDTO {
      return{
        uuid: cursoDominio.uuid.obtenerId(),
        titulo: cursoDominio.titulo.obtenerTitulo(),
        estatus: cursoDominio.estatus.obtenerEstatus(),
        valorDuracion: cursoDominio.duracionEstimada.ObtenerDuracionEstimadaValor(),
        escalaDuracion: cursoDominio.duracionEstimada.ObtenerDuracionEstimadaEscala(),
        fechaCreacion: cursoDominio.fechaCreacion.obtenerFecha(),
        lecciones: lecciones,
        habilidades: habilidades,
        fechaUltimaModificacion: cursoDominio.fechaUltimaModificacion.obtenerFecha(),
      }

  }
}
