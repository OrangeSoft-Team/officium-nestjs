import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { ConsultarListaCursosRespuestaDTO } from '../../aplicacion/dto/comandos/ConsultarListaCursos.query'
import { ListaCursosApiDTO } from '../dto/ListaCursos.api.dto'

export abstract class CursoApiMapeador {
  public static convertirRespuestaListarCursos(
    respuesta: ConsultarListaCursosRespuestaDTO[],
  ): ListaCursosApiDTO[] {
    const cursos: ListaCursosApiDTO[] = respuesta.map((curso) => {
      return {
        uuid: curso.uuid,
        titulo: curso.titulo,
        estatus: curso.estatus,
        fechaCreacion: MapeadorFecha.formatear(curso.fechaCreacion),
      }
    })
    return cursos
  }
}
