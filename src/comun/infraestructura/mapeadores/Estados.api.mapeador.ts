import {
  ObtenerEstadosRespuestaDTO,
  ObtenerEstadosSolicitudDTO,
} from '../../aplicacion/dto/ObtenerEstados.dto'
import { ObtenerEstadosApiDTO } from '../dto/ObtenerEstados.api.dto'

export class EstadoAPIMapeador {
  public static transformarSolicitudHttpObtenerEstados(
    idPais: string,
  ): ObtenerEstadosSolicitudDTO {
    return { idPais }
  }

  public static transformarRespuestaObtenerEstados(
    estados: ObtenerEstadosRespuestaDTO[],
  ): ObtenerEstadosApiDTO[] {
    return estados.map((estado) => {
      return {
        uuidPais: estado.idPais,
        uuidEstado: estado.idEstado,
        nombreEstado: estado.nombreEstado,
      }
    })
  }
}
