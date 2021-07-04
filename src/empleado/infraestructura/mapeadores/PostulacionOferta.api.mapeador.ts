import {
  ConsultarPostulacionesDTO,
  ConsultarPostulacionesPeticionDTO,
} from '../../aplicacion/dto/postulacion/ConsultarPostulaciones.dto'
import { PostularseOfertaLaboralSolicitudDTO } from '../../aplicacion/dto/postulacion/PostularseOfertaLaboral.dto'
import { AplicarOfertaLaboralEmpleadoApiDTO } from '../dto/oferta/AplicarOfertaLaboralEmpleado.api.dto'
import { ConsultarPostulacionesAPIDTO } from '../dto/postulacion/ConsultarPostulaciones.dto'

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

  public static transformarSolicitudHttpConsultarPostulaciones(
    idEmpleado: string,
  ): ConsultarPostulacionesPeticionDTO {
    return {
      uuidEmpleado: idEmpleado,
    }
  }
  public static ConsultarPostulacionesRespuestaHttp(
    datos: ConsultarPostulacionesDTO[],
  ): ConsultarPostulacionesAPIDTO[] {
    const http = []
    datos.forEach((peticiones) =>
      http.push({
        uuid: peticiones.uuid,
        uuidOfertaLaboral: peticiones.uuidOfertaLaboral,
        tituloOferta: peticiones.tituloOferta,
        cargoOferta: peticiones.cargoOferta,
        empresaNombre: peticiones.empresaNombre,
        comentario: peticiones.comentario,
      }),
    )
    return http
  }
}
