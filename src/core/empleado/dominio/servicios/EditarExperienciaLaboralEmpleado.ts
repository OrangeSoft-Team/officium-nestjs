import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosAgregarExperienciaLaboral {
  id: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: Date
  fechaFin: Date
}

export abstract class EditarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static ejecutar(
    datos: DatosAgregarExperienciaLaboral,
    empleado: Empleado,
  ): Empleado {
    const experienciasLaboral = ExperienciaLaboral.crear({
      identificador: IdentificadorExperienciaLaboral.crear(datos.id),
      cargo: CargoExperienciaLaboral.crear(datos.cargo),
      nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(datos.nombreEmpresa),
      rangoFecha: RangoFechaExperienciaLaboral.crear(
        datos.fechaInicio,
        datos.fechaFin,
      ),
    })

    empleado.editarExperienciaLaboral(experienciasLaboral)

    return empleado
  }
}
