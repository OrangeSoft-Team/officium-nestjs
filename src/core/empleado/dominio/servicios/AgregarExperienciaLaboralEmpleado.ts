import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosAgregarExperienciaLaboral {
  identificador: IdentificadorExperienciaLaboral
  cargo: CargoExperienciaLaboral
  nombreEmpresa: NombreEmpresaExperienciaLaboral
  rangoFecha: RangoFechaExperienciaLaboral
}
export abstract class AgregarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static agregar(
    datos: DatosAgregarExperienciaLaboral,
    empleado: Empleado,
  ): Empleado {
    const experienciaLaboral = ExperienciaLaboral.crear({
      ...datos,
    })

    empleado.agregarExperienciaLaboral(experienciaLaboral)

    return empleado
  }
}
