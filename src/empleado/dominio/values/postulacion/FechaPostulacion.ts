import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  FechaPostulacionVacia,
  FechaPostulacionInvalida,
} from '../../excepciones/postulacion/FechaPostulacion.excepciones'

export class FechaPostulacion extends ValueObject {
  private constructor(private readonly fecha: Date) {
    super()
  }

  public obtenerFecha() {
    return this.fecha
  }

  public esIgual(fechaPostulacion: FechaPostulacion): boolean {
    return this.fecha.getTime() == fechaPostulacion.fecha.getTime()
  }

  public static crear(fecha: Date): FechaPostulacion {
    // no debe estar vacio
    if (fecha == null || fecha == undefined)
      throw new FechaPostulacionVacia(
        'La fecha de postulación de la oferta laboral no debe estar vacía.',
      )

    // debe ser una fecha valida
    if (!(fecha instanceof Date))
      throw new FechaPostulacionInvalida(
        'La fecha de postulación de la oferta laboral no es una fecha valida.',
      )

    const fechaPostulacion = new FechaPostulacion(fecha)

    return fechaPostulacion
  }
}
