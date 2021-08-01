import { ObtenerHabilidadesRespuestaDTO } from '../../aplicacion/dto/queries/ObtenerHabilidades.query'
import { HabilidadesApiDTO } from '../dto/Habilidades.api.dto'

export abstract class HabilidadApiMapeador {
  public static convertirRespuestaObtenerHabilidades(
    respuesta: ObtenerHabilidadesRespuestaDTO[],
  ): HabilidadesApiDTO[] {
    return respuesta?.map((hab) => {
      return {
        uuid: hab.id,
        categoria: hab.categoria,
        nombre: hab.nombre,
      }
    })
  }
}
