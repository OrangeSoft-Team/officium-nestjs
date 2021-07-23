import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { AgregarExperienciaLaboralEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { EditarExperienciaLaboralEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/EditarExperienciaLaboralEmpleado.comando'
import { EliminarExperienciaLaboralEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/EliminarExperienciaLaboralEmpleado.comando'
import {
  ConsultarExperienciasLaboralesEmpleadoQueryDTO,
  ConsultarExperienciasLaboralesEmpleadoRespuestaDTO,
} from '../../aplicacion/dto/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { ComandoAgregarExperienciaLaboral } from '../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { ComandoEditarExperienciaLaboral } from '../cqrs/comandos/EditarExperienciaLaboralEmpleado.comando'
import { ComandoEliminarExperienciaLaboral } from '../cqrs/comandos/EliminarExperienciaLaboralEmpleado.comando'
import { QueryConsultarExperienciasLaboralesEmpleado } from '../cqrs/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { ExperienciasLaboralesEmpleadoApiDTO } from '../dto/ExperienciasLaboralesEmpleado.api.dto'

export abstract class ExperienciaLaboralApiMapeador {
  public static convertirComandoAgregarExperienciaLaboral(
    comando: ComandoAgregarExperienciaLaboral,
  ): AgregarExperienciaLaboralEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      idEmpleado: datos.idUsuario,
      cargo: datos.cargo,
      nombreEmpresa: datos.nombreEmpresa,
      fechaInicio: MapeadorFecha.transformar(datos.fechaInicio),
      fechaFin: MapeadorFecha.transformar(datos.fechaFin),
    }
  }

  public static convertirComandoEditarExperienciaLaboral(
    comando: ComandoEditarExperienciaLaboral,
  ): EditarExperienciaLaboralEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      id: datos.id,
      idEmpleado: datos.idUsuario,
      cargo: datos.cargo,
      nombreEmpresa: datos.nombreEmpresa,
      fechaInicio: MapeadorFecha.transformar(datos.fechaInicio),
      fechaFin: MapeadorFecha.transformar(datos.fechaFin),
    }
  }

  public static convertirComandoEliminarExperienciaLaboral(
    comando: ComandoEliminarExperienciaLaboral,
  ): EliminarExperienciaLaboralEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      id: datos.id,
      idEmpleado: datos.idUsuario,
    }
  }

  public static convertirQueryConsultarExperienciasLaborales(
    query: QueryConsultarExperienciasLaboralesEmpleado,
  ): ConsultarExperienciasLaboralesEmpleadoQueryDTO {
    return {
      idEmpleado: query.datos.idUsuario,
    }
  }

  public static convertirRespuestaConsultarExperienciasLaborales(
    respuesta: ConsultarExperienciasLaboralesEmpleadoRespuestaDTO[],
  ): ExperienciasLaboralesEmpleadoApiDTO[] {
    return respuesta.map((experiencia) => {
      return {
        uuid: experiencia.id,
        cargo: experiencia.cargo,
        nombreEmpresa: experiencia.nombreEmpresa,
        fechaInicio: MapeadorFecha.formatear(experiencia.fechaInicio),
        fechaFin: MapeadorFecha.formatear(experiencia.fechaFin),
      }
    })
  }
}
