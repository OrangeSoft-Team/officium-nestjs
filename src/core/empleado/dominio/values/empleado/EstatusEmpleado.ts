import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  EstatusEmpleadoVacio,
  EstatusEmpleadoInvalido,
} from '../../excepciones/empleado/EstatusEmpleado.excepciones'

type ESTADOS = 'DISPONIBLE' | 'OCUPADO' | 'SUSPENDIDO'

export class EstatusEmpleado implements IValueObject {
  private constructor(private readonly estatus: ESTADOS) {}

  public obtenerEstatus() {
    return this.estatus
  }

  public esIgual(estatusEmpleado: EstatusEmpleado): boolean {
    return this.estatus == estatusEmpleado.estatus
  }

  public static crear(estatus: ESTADOS): EstatusEmpleado {
    if (!estatus)
      throw new EstatusEmpleadoVacio(
        'El estatus del empleado no debe estar vacío.',
      )

    if (!['DISPONIBLE', 'OCUPADO', 'SUSPENDIDO'].includes(estatus))
      throw new EstatusEmpleadoInvalido(
        'El estatus del empleado debe ser "DISPONIBLE", "OCUPADO" u "SUSPENDIDO".',
      )
    // Si no hay errores
    return new EstatusEmpleado(estatus)
  }
}
