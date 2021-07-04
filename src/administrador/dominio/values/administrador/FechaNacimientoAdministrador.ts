import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  AdministradorMenorDeEdad,
  FechaNacimientoAdministradorInvalida,
  FechaNacimientoAdministradorVacio,
} from '../../excepciones/Administrador/FechaNacimientoAdministrador.excepciones'

export class FechaNacimientoAdministrador extends ValueObject {
  private constructor(private readonly fecha: Date) {
    super()
  }

  public esIgual(fechaAdministrador: FechaNacimientoAdministrador): boolean {
    return this.fecha.getTime() == fechaAdministrador.fecha.getTime()
  }

  public static crear(fecha: Date): FechaNacimientoAdministrador {
    // la fecha no debe ser vacia
    if (fecha == null || fecha == undefined)
      throw new FechaNacimientoAdministradorVacio(
        'La fecha de nacimiento del Administrador no debe estar vacía.',
      )

    // debe ser una fecha valida
    if (!(fecha instanceof Date))
      throw new FechaNacimientoAdministradorInvalida(
        'La fecha de nacimiento del Administrador no es una fecha valida.',
      )

    const fechaNacimiento = new FechaNacimientoAdministrador(fecha)

    // la edad debe ser mayor a 18
    if (new Date().getFullYear() - fecha.getFullYear() < 18)
      throw new AdministradorMenorDeEdad(
        'El Administrador no debe ser menor de edad.',
      )

    return fechaNacimiento
  }
}
