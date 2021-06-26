import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  FechaModificacionOfertaInvalida,
  FechaModificacionOfertaVacia,
} from '../../excepciones/oferta/FechaModificacionOferta.excepciones'

export class FechaModificacionOferta extends ValueObject {
  private constructor(private readonly fecha: Date) {
    super()
  }

  public esIgual(fechaModificacionOferta: FechaModificacionOferta): boolean {
    return this.fecha.getTime() == fechaModificacionOferta.fecha.getTime()
  }

  public static crear(fecha: Date): FechaModificacionOferta {
    // no debe estar vacio
    if (fecha == null || fecha == undefined)
      throw new FechaModificacionOfertaVacia(
        fecha,
        'La fecha de modificación de la oferta no debe estar vacía.',
      )

    // debe ser una fecha valida
    if (!(fecha instanceof Date))
      throw new FechaModificacionOfertaInvalida(
        fecha,
        'La fecha de modificación de la oferta no es una fecha valida.',
      )

    const fechaModificacionOferta = new FechaModificacionOferta(fecha)

    return fechaModificacionOferta
  }
}
