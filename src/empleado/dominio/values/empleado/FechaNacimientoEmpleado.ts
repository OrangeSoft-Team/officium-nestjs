import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  EmpleadoMenorDeEdad,
  FechaNacimientoEmpleadoInvalida,
  FechaNacimientoEmpleadoVacio,
} from '../../excepciones/empleado/FechaNacimientoEmpleado.excepciones'

export class FechaNacimientoEmpleado extends ValueObject {
  private constructor(private readonly fecha: Date) {
    super()
  }

  public esIgual(fechaEmpleado: FechaNacimientoEmpleado): boolean {
    return this.fecha.getTime() == fechaEmpleado.fecha.getTime()
  }

  public static crear(fecha: Date): FechaNacimientoEmpleado {
    // la fecha no debe ser vacia
    if (fecha == null || fecha == undefined)
      throw new FechaNacimientoEmpleadoVacio(
        'La fecha de nacimiento del empleado no debe estar vacía.',
      )

    // debe ser una fecha valida
    if (!(fecha instanceof Date))
      throw new FechaNacimientoEmpleadoInvalida(
        'La fecha de nacimiento del empleado no es una fecha valida.',
      )

    const fechaNacimiento = new FechaNacimientoEmpleado(fecha)

    // la edad debe ser mayor a 18
    if (new Date().getFullYear() - fecha.getFullYear() < 18)
      throw new EmpleadoMenorDeEdad('El empleado no debe ser menor de edad.')

    return fechaNacimiento
  }
}
