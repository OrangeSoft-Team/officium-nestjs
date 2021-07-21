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

export abstract class AgregarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static ejecutar(
    datos: DatosAgregarExperienciaLaboral,
    empleado: Empleado,
  ): Empleado {
    const experienciaLaboral = ExperienciaLaboral.crear({
      identificador: IdentificadorExperienciaLaboral.crear(datos.id),
      rangoFecha: RangoFechaExperienciaLaboral.crear(
        datos.fechaInicio,
        datos.fechaFin,
      ),
      nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(datos.nombreEmpresa),
      cargo: CargoExperienciaLaboral.crear(datos.cargo),
    })

    empleado.agregarExperienciaLaboral(experienciaLaboral)

    return empleado
  }
}
