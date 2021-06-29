import {
  ObtenerCiudadesSolicitudDTO,
  ObtenerCiudadesRespuestaDTO,
} from '../../aplicacion/dto/ObtenerCiudades.dto'
import { ObtenerCiudadesApiDTO } from '../dto/ObtenerCiudades.api.dto'

export class ObtenerCiudadesAPIMapeador {
  public static httpSolicitud(
    idPais: string,
    idEstado: string,
  ): ObtenerCiudadesSolicitudDTO {
    return { idPais, idEstado }
  }

  public static respuestaHttp(
    respuesta: ObtenerCiudadesRespuestaDTO[],
  ): ObtenerCiudadesApiDTO[] {
    return respuesta.map((ciudad) => {
      return {
        uuidCiudad: ciudad.idCiudad,
        uuidEstado: ciudad.idEstado,
        uuidPais: ciudad.idPais,
        nombreCiudad: ciudad.nombreCiudad,
      }
    })
  }
}
