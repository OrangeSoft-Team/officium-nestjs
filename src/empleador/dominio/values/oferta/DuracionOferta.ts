import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  DuracionOfertaVacia,
  DuracionOfertaNoEsNumero,
  EscalaDuracionOfertaVacia,
  DuracionOfertaInvalida,
  EscalaDuracionOfertaInvalida,
} from '../../excepciones/oferta/DuracionOferta.excepciones'

type ESCALAS = 'hora' | 'día' | 'semana' | 'mes'

export class DuracionOferta extends ValueObject {
  private constructor(
    private readonly duracion: number,
    private readonly escala: ESCALAS,
  ) {
    super()
  }

  public esIgual(duracionOferta: DuracionOferta): boolean {
    return (
      this.duracion == duracionOferta.duracion &&
      this.escala == duracionOferta.escala
    )
  }

  public static crear(duracion: number, escala: ESCALAS): DuracionOferta {
    // debe tener una duración
    if (duracion == null || duracion == undefined)
      throw new DuracionOfertaVacia(
        duracion,
        'La duración de la oferta laboral no debe estar vacía.',
      )
    // la duración debe ser un número
    if (typeof duracion != 'number')
      throw new DuracionOfertaNoEsNumero(
        duracion,
        'La duración de la oferta laboral debe ser un número.',
      )
    // debe tener una escala
    if (escala == null || escala == undefined)
      throw new EscalaDuracionOfertaVacia(
        escala,
        'La escala de duración de la oferta laboral no debe estar vacía.',
      )

    const duracionOferta = new DuracionOferta(duracion, escala)

    // La duracion debe ser mayor a 0
    if (duracion <= 0)
      throw new DuracionOfertaInvalida(
        duracionOferta,
        'La duración de la oferta laboral debe ser mayor a 0.',
      )
    // La duracion debe ser menor o igual a 99
    if (duracion > 99)
      throw new DuracionOfertaInvalida(
        duracionOferta,
        'La duración de la oferta laboral debe ser menor o igual a 99.',
      )
    // La escala debe ser uno de los siguientes valores
    if (!['hora', 'día', 'semana', 'mes'].includes(escala))
      throw new EscalaDuracionOfertaInvalida(
        duracionOferta,
        'La escala de la duración de la oferta laboral debe ser "hora", "día", "semana" o "mes".',
      )

    return duracionOferta
  }
}
