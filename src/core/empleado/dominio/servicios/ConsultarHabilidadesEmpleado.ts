import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'

export abstract class ConsultarHabilidadesEmpleado implements IServicioDominio {
  public static consultar(empleado: Empleado): IdentificadorHabilidad[] {
    return empleado.obtenerIdentificadoresHabilidades()
  }
}
