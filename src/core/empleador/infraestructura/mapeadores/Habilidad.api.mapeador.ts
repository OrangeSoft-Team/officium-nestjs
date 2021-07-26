import { HabilidadesPerfilEmpresaRespuestaDTO } from '../../aplicacion/dto/queries/ObtenerPerfilEmpresa.query'
import { HabilidadesDatosBasicosEmpleadorApiDTO } from '../dto/DatosBasicosEmpleador.api.dto'

export abstract class HabilidadApiMapeador {
  public static convertirRespuestaObtenerHabilidadesEmpresa(
    respuesta: HabilidadesPerfilEmpresaRespuestaDTO[],
  ): HabilidadesDatosBasicosEmpleadorApiDTO[] {
    return respuesta.map((habilidad) => {
      return {
        uuid: habilidad.id,
        nombre: habilidad.nombre,
        categoria: habilidad.categoria,
      }
    })
  }
}
