import { PostularseOfertaLaboralSolicitudDTO } from '../../aplicacion/dto/PostularseOfertaLaboral.dto'
import { AplicarOfertaLaboralEmpleadoApiDTO } from '../dto/AplicarOfertaLaboralEmpleado.api.dto'

export class PostulacionOfertaAPIMapeador {
  // Mapear solicitud http a solicitud de capa de aplicación para aplicar a una oferta
  public static transformarSolicitudHttpPostularseOferta(
    http: AplicarOfertaLaboralEmpleadoApiDTO,
    idOferta: string,
  ): PostularseOfertaLaboralSolicitudDTO {
    return {
      idEmpleado: http.uuidEmpleado,
      idOferta,
      comentario: http.comentario,
    }
  }
}
