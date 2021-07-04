import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  EstadoOfertaInvalido,
  EstadoOfertaVacio,
} from '../../excepciones/oferta/EstadoOferta.excepciones'

type ESTADOS = 'publicado' | 'cancelado' | string

export class EstadoOferta extends ValueObject {
  private constructor(private readonly estado: ESTADOS) {
    super()
  }

  public obtenerEstado() {
    return this.estado
  }

  public esIgual(estadoOferta: EstadoOferta): boolean {
    return this.estado == estadoOferta.estado
  }

  public static crear(estado: ESTADOS): EstadoOferta {
    // no debe estar vacio
    if (estado == null || estado == undefined)
      throw new EstadoOfertaVacio(
        'El estado de la oferta laboral no debe estar vacío.',
      )

    const estadoOferta = new EstadoOferta(estado)

    // debe ser uno de los siguientes valores
    if (!['publicado', 'cancelado'].includes(estado))
      throw new EstadoOfertaInvalido(
        'El estado de la oferta laboral debe ser "publicado" o "cancelado".',
      )

    return estadoOferta
  }
}
