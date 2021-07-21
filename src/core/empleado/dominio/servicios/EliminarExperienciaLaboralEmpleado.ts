import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'

export interface DatosEliminarExperienciaLaboralEmpleado {
  identificador: IdentificadorExperienciaLaboral
}

export abstract class EliminarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static eliminar(
    datos: DatosEliminarExperienciaLaboralEmpleado,
    empleado: Empleado,
  ): Empleado {
    empleado.eliminarExperienciaLaboral(datos.identificador)

    return empleado
  }
}
