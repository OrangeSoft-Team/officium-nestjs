import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'

export abstract class ConsultarExperienciasLaboralesEmpleado
  implements IServicioDominio
{
  public static consultar(empleado: Empleado): ExperienciaLaboral[] {
    return empleado.obtenerExperienciasLaborales()
  }
}
