import { ActualizarHabilidadesEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/ActualizarHabilidadesEmpleado.comando'
import {
  ConsultarHabilidadesEmpleadoQueryDTO,
  ConsultarHabilidadesEmpleadoRespuestaDTO,
} from '../../aplicacion/dto/queries/ConsultarHabilidadesEmpleado.query'
import { ComandoActualizarHabilidadesEmpleado } from '../cqrs/comandos/ActualizarHabilidadesEmpleado.comando'
import { QueryConsultarHabilidadesEmpleado } from '../cqrs/queries/ConsultarHabilidadesEmpleado.query'
import { HabilidadesEmpleadoApiDTO } from '../dto/HabilidadesEmpleado.api.dto'

export abstract class HabilidadApiMapeador {
  public static convertirComandoActualizarHabilidades(
    comando: ComandoActualizarHabilidadesEmpleado,
  ): ActualizarHabilidadesEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      idEmpleado: datos.idUsuario,
      idHabilidades: datos.uuid,
    }
  }

  public static convertirQueryConsultarHabilidades(
    query: QueryConsultarHabilidadesEmpleado,
  ): ConsultarHabilidadesEmpleadoQueryDTO {
    const datos = query.datos
    return {
      idEmpleado: datos.idUsuario,
    }
  }

  public static convertirRespuestaConsultarHabilidades(
    respuesta: ConsultarHabilidadesEmpleadoRespuestaDTO[],
  ): HabilidadesEmpleadoApiDTO {
    const api = { uuid: [] }
    respuesta.map((habilidad) => api.uuid.push(habilidad.idHabilidad))
    return api
  }
}
