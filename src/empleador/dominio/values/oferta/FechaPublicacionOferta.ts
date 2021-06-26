import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  FechaPublicacionOfertaInvalida,
  FechaPublicacionOfertaVacia,
} from '../../excepciones/oferta/FechaPublicacionOferta.excepciones'

export class FechaPublicacionOferta extends ValueObject {
  private constructor(private readonly fecha: Date) {
    super()
  }

  public obtenerFecha() {
    return this.fecha
  }

  public esIgual(fechaPublicacionOferta: FechaPublicacionOferta): boolean {
    return this.fecha.getTime() == fechaPublicacionOferta.fecha.getTime()
  }

  public static crear(fecha: Date): FechaPublicacionOferta {
    // no debe estar vacio
    if (fecha == null || fecha == undefined)
      throw new FechaPublicacionOfertaVacia(
        fecha,
        'La fecha de publicación de la oferta no debe estar vacía.',
      )

    // debe ser una fecha valida
    if (!(fecha instanceof Date))
      throw new FechaPublicacionOfertaInvalida(
        fecha,
        'La fecha de publicación de la oferta no es una fecha valida.',
      )

    const fechaPublicacionOferta = new FechaPublicacionOferta(fecha)

    return fechaPublicacionOferta
  }
}
