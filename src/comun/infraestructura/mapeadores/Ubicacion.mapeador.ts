import { ObtenerPaisesRespuestaDTO } from '../../aplicacion/dto/queries/ObtenerPaises.query'
import { PaisesApiDTO } from '../dto/Paises.api.dto'

export abstract class UbicacionApiMapeador {
  public static convertirRespuestaObtenerPaises(
    respuesta: ObtenerPaisesRespuestaDTO[],
  ): PaisesApiDTO[] {
    return respuesta.map((pais) => {
      return {
        uuidPais: pais.id,
        nombrePais: pais.nombre,
      }
    })
  }
}
