import { ObtenerPaisesRespuestaDTO } from '../../aplicacion/dto/ObtenerPaises.dto'
import { ObtenerPaisesApiDTO } from '../dto/ObtenerPaises.api.dto'

export class PaisAPIMapeador {
  public static transformarRespuestaObtenerPaises(
    paises: ObtenerPaisesRespuestaDTO[],
  ): ObtenerPaisesApiDTO[] {
    return paises.map((pais) => {
      return {
        uuidPais: pais.id,
        nombrePais: pais.nombre,
      }
    })
  }
}
