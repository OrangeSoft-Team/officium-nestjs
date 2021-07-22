import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosEditarExperienciaLaboral {
  identificador: IdentificadorExperienciaLaboral
  cargo: CargoExperienciaLaboral
  nombreEmpresa: NombreEmpresaExperienciaLaboral
  rangoFecha: RangoFechaExperienciaLaboral
}

export abstract class EditarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static editar(
    datos: DatosEditarExperienciaLaboral,
    empleado: Empleado,
  ): Empleado {
    const experienciasLaboral = ExperienciaLaboral.crear({
      ...datos,
    })

    empleado.editarExperienciaLaboral(experienciasLaboral)

    return empleado
  }
}
