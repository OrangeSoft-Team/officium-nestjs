import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  TituloOfertaVacio,
  LongitudInvalidaTituloOferta,
} from '../../excepciones/oferta/TituloOferta.excepciones'

export class TituloOferta extends ValueObject {
  private constructor(private readonly titulo: string) {
    super()
  }

  public obtenerTitulo() {
    return this.titulo
  }

  public esIgual(tituloOferta: TituloOferta): boolean {
    return this.titulo == tituloOferta.titulo
  }

  public static crear(titulo: string): TituloOferta {
    // No debe ser vacío
    if (titulo == null || titulo == undefined || titulo == '')
      throw new TituloOfertaVacio(
        'El titulo de la oferta laboral no puede estar vacío.',
      )

    const tituloOferta = new TituloOferta(titulo)

    // Debe contener al menos 4 caracteres
    if (titulo.length < 4)
      throw new LongitudInvalidaTituloOferta(
        'El titulo de la oferta laboral debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como máximo 80 caracteres
    if (titulo.length > 80)
      throw new LongitudInvalidaTituloOferta(
        'El titulo de la oferta laboral debe contener como máximo 80 caracteres.',
      )
    // Si no hay errores
    return tituloOferta
  }
}
