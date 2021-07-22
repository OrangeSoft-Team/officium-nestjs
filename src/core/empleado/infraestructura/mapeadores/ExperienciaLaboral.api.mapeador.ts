import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { AgregarExperienciaLaboralEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { ComandoAgregarExperienciaLaboral } from '../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'

export abstract class ExperienciaLaboralApiMapeador {
  public static convertirComandoAgregarExperienciaLaboral(
    comando: ComandoAgregarExperienciaLaboral,
  ): AgregarExperienciaLaboralEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      idEmpleado: datos.id_usuario,
      cargo: datos.cargo,
      nombreEmpresa: datos.nombreEmpresa,
      fechaInicio: MapeadorFecha.transformar(datos.fechaInicio),
      fechaFin: MapeadorFecha.transformar(datos.fechaFin),
    }
  }
}
