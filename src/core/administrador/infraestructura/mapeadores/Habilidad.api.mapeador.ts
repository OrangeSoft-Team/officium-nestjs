import { HabilidadPerfilEmpleadoRespuestaDTO } from '../../aplicacion/dto/queries/VerPerfilEmpleado.query'
import { HabilidadDetalleEmpleadoApiDTO } from '../dto/DetalleEmpleado.api.dto'

export abstract class HabilidadApiMapeador {
  public static convertirRespuestaHabilidadEmpleado(
    respuesta: HabilidadPerfilEmpleadoRespuestaDTO,
  ): HabilidadDetalleEmpleadoApiDTO {
    return {
      uuid: respuesta.id,
      nombre: respuesta.nombre,
      categoria: respuesta.categoria,
    }
  }
}
