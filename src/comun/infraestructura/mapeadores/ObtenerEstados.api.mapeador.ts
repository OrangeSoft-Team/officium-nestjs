import {
  ObtenerEstadosRespuestaDTO,
  ObtenerEstadosSolicitudDTO,
} from '../../aplicacion/dto/ObtenerEstados.dto'
import { ObtenerEstadosApiDTO } from '../dto/ObtenerEstados.api.dto'

export class ObtenerEstadosAPIMapeador {
  public static httpSolicitud(idPais: string): ObtenerEstadosSolicitudDTO {
    return { idPais }
  }

  public static respuestaHttp(
    respuesta: ObtenerEstadosRespuestaDTO[],
  ): ObtenerEstadosApiDTO[] {
    return respuesta.map((estado) => {
      return {
        uuidPais: estado.idPais,
        uuidEstado: estado.idEstado,
        nombreEstado: estado.nombreEstado,
      }
    })
  }
}
