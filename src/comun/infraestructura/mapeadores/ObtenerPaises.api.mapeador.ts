import { ObtenerPaisesRespuestaDTO } from '../../aplicacion/dto/ObtenerPaises.dto'
import { ObtenerPaisesApiDTO } from '../dto/ObtenerPaises.api.dto'

export class ObtenerPaisesAPIMapeador {
  public static respuestaHttp(
    respuesta: ObtenerPaisesRespuestaDTO[],
  ): ObtenerPaisesApiDTO[] {
    return respuesta.map((pais) => {
      return {
        uuidPais: pais.id,
        nombrePais: pais.nombre,
      }
    })
  }
}
