import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  DescripcionOfertaVacia,
  LongitudInvalidaDescripcionOferta,
} from '../../excepciones/oferta/DescripcionOferta.excepciones'

export class DescripcionOferta extends ValueObject {
  private constructor(private readonly descripcion: string) {
    super()
  }

  public obtenerDescripcion() {
    return this.descripcion
  }

  public esIgual(descripcionOferta: DescripcionOferta): boolean {
    return this.descripcion == descripcionOferta.descripcion
  }

  public static crear(descripcion: string): DescripcionOferta {
    // No debe ser vacio
    if (descripcion == null || descripcion == undefined || descripcion == '')
      throw new DescripcionOfertaVacia(
        descripcion,
        'La descripción de la oferta laboral no puede estar vacía.',
      )

    const descripcionOferta = new DescripcionOferta(descripcion)

    // Debe contener al menos 32 caracteres
    if (descripcion.length < 32)
      throw new LongitudInvalidaDescripcionOferta(
        descripcionOferta,
        'La descripción de la oferta laboral debe contener como mínimo 32 caracteres.',
      )
    // Debe contener como maximo 512 caracteres
    if (descripcion.length > 512)
      throw new LongitudInvalidaDescripcionOferta(
        descripcionOferta,
        'La descripción de la oferta laboral debe contener como máximo 512 caracteres.',
      )
    // Si no hay errores
    return descripcionOferta
  }
}
