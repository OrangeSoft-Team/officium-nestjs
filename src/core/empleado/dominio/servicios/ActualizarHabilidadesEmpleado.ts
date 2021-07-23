import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'

export interface DatosActualizarHabilidadesEmpleado {
  identificadoresHabilidades: IdentificadorHabilidad[]
}

export abstract class ActualizarHabilidadesEmpleado
  implements IServicioDominio
{
  public static actualizar(
    datos: DatosActualizarHabilidadesEmpleado,
    empleado: Empleado,
  ): Empleado {
    empleado.actualizarHabilidades(datos.identificadoresHabilidades)

    return empleado
  }
}
