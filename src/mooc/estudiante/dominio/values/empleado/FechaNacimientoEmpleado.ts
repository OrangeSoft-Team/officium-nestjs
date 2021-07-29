import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  FechaNacimientoEmpleadoVacia,
  FechaNacimientoEmpleadoInvalida,
} from '../../excepciones/empleado/FechaNacimientoEmpleado.excepciones'

export class FechaNacimientoEmpleado implements IValueObject {
  private constructor(private readonly fecha: Date) {}

  public obtenerFecha() {
    return this.fecha
  }

  public esIgual(fechaNacimiento: FechaNacimientoEmpleado): boolean {
    return this.fecha == fechaNacimiento.fecha
  }

  public static crear(fecha: Date): FechaNacimientoEmpleado {
    if (!fecha)
      throw new FechaNacimientoEmpleadoVacia(
        'La fecha de nacimiento del empleado no debe estar vacía.',
      )

    if (!(fecha instanceof Date))
      throw new FechaNacimientoEmpleadoInvalida(
        'La fecha de nacimiento del empleado no es una fecha valida.',
      )
    // si no hay errores
    return new FechaNacimientoEmpleado(fecha)
  }
}
