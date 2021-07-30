import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { ExperienciaLaboralPerfilEmpleadoRespuestaDTO } from '../../aplicacion/dto/queries/VerPerfilEmpleado.query'
import { ExperienciaDetalleEmpleadoApiDTO } from '../dto/DetalleEmpleado.api.dto'

export abstract class ExperienciaLaboralApiMapeador {
  public static convertirRespuestaExperienciaLaboralEmpleado(
    respuesta: ExperienciaLaboralPerfilEmpleadoRespuestaDTO,
  ): ExperienciaDetalleEmpleadoApiDTO {
    return {
      uuid: respuesta.id,
      nombreEmpresa: respuesta.nombreEmpresa,
      cargo: respuesta.cargo,
      fechaInicio: MapeadorFecha.formatear(respuesta.fechaInicio),
      fechaFin: MapeadorFecha.formatear(respuesta.fechaFin),
    }
  }
}
