import {
  ObtenerCiudadesRespuestaDTO,
  ObtenerCiudadesSolicitudDTO,
} from '../../aplicacion/dto/ObtenerCiudades.dto'
import { ObtenerCiudadesApiDTO } from '../dto/ObtenerCiudades.api.dto'

export class CiudadAPIMapeador {
  public static transformarSolicitudHttpObtenerCiudades(
    idPais: string,
    idEstado: string,
  ): ObtenerCiudadesSolicitudDTO {
    return { idPais, idEstado }
  }

  public static transformarRespuestaObtenerCiudades(
    ciudades: ObtenerCiudadesRespuestaDTO[],
  ): ObtenerCiudadesApiDTO[] {
    return ciudades.map((ciudad) => {
      return {
        uuidCiudad: ciudad.idCiudad,
        uuidEstado: ciudad.idEstado,
        uuidPais: ciudad.idPais,
        nombreCiudad: ciudad.nombreCiudad,
      }
    })
  }
}
