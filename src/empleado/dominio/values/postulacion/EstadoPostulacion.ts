import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  EstadoPostulacionVacio,
  EstadoPostulacionInvalido,
} from '../../excepciones/postulacion/EstadoPostulacion.excepciones'

type ESTADOS = 'aprobada' | 'rechazada' | 'en proceso' | string

export class EstadoPostulacion extends ValueObject {
  private constructor(private readonly estado: ESTADOS) {
    super()
  }

  public obtenerEstado() {
    return this.estado
  }

  public esIgual(estadoPostulacion: EstadoPostulacion): boolean {
    return this.estado == estadoPostulacion.estado
  }

  public static crear(estado: ESTADOS): EstadoPostulacion {
    // no debe estar vacio
    if (estado == null || estado == undefined)
      throw new EstadoPostulacionVacio(
        'El estado de la postulación de la oferta laboral no debe estar vacío.',
      )

    const estadoPostulacion = new EstadoPostulacion(estado)

    // debe ser uno de los siguientes valores
    if (!['aprobada', 'rechazada', 'en proceso'].includes(estado))
      throw new EstadoPostulacionInvalido(
        'El estado de la postulación de la oferta laboral debe ser "aprobada" o "rechazada" o "en proceso".',
      )

    return estadoPostulacion
  }
}
