import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { DetalleCursoApiDTO } from '../../infraestructura/dto/DetalleCurso.api.dto'
import { ConsultarDetalleCursoRespuestaDTO } from '../../aplicacion/dto/queries/ConsultarDetalleCurso.query'
import { ConsultarListaCursosRespuestaDTO } from '../../aplicacion/dto/queries/ConsultarListaCursos.query'
import { ListaCursosApiDTO } from '../dto/ListaCursos.api.dto'

export abstract class CursoApiMapeador {
  public static convertirRespuestaListarCursos(
    respuesta: ConsultarListaCursosRespuestaDTO[],
  ): ListaCursosApiDTO[] {
    const cursos: ListaCursosApiDTO[] = respuesta?.map((curso) => {
      return {
        uuid: curso.uuid,
        titulo: curso.titulo,
        estatus: curso.estatus,
        fechaCreacion: MapeadorFecha.formatear(curso.fechaCreacion),
      }
    })
    return cursos
  }

  public static convertirRespuestaDetalleCurso(
    respuesta: ConsultarDetalleCursoRespuestaDTO,
  ): DetalleCursoApiDTO {
    return {
      uuid: respuesta.uuid,
      titulo: respuesta.titulo,
      estatus: respuesta.estatus,
      valorDuracion: respuesta.valorDuracion,
      escalaDuracion: respuesta.escalaDuracion,
      fechaCreacion: MapeadorFecha.formatear(respuesta.fechaCreacion),
      fechaUltimaModificacion: MapeadorFecha.formatear(
        respuesta?.fechaUltimaModificacion,
        true,
      ),
      lecciones: respuesta.lecciones,
      habilidades: respuesta.habilidades,
    }
  }
}
