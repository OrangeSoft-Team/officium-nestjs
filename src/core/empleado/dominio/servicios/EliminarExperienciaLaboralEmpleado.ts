import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'

export abstract class EliminarExperienciaLaboralEmpleado
  implements IServicioDominio
{
  public static ejecutar(id: string, empleado: Empleado): Empleado {
    const identificadorExperiencia = IdentificadorExperienciaLaboral.crear(id)

    empleado.eliminarExperienciaLaboral(identificadorExperiencia)

    return empleado
  }
}
