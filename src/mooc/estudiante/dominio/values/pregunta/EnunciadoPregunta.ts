import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  EnunciadoPreguntaVacio,
  LongitudInvalidaEnunciadoPregunta,
} from '../../excepciones/pregunta/EnunciadoPregunta.excepciones'

export class EnunciadoPregunta implements IValueObject {
  private constructor(private readonly enunciado: string) {}

  public obtenerEnunciado() {
    return this.enunciado
  }

  public esIgual(enunciado: EnunciadoPregunta): boolean {
    return this.enunciado == enunciado.obtenerEnunciado()
  }

  public static crear(enunciado: string): EnunciadoPregunta {
    // No debe ser vacio
    if (enunciado == null || enunciado == undefined || enunciado == '')
      throw new EnunciadoPreguntaVacio(
        'El enunciado de la pregunta no puede estar vacio.',
      )
    if (enunciado.length < 16)
      throw new LongitudInvalidaEnunciadoPregunta(
        'La pregunta no puede ser menor a 16 caracteres',
      )

    if (enunciado.length > 264)
      throw new LongitudInvalidaEnunciadoPregunta(
        'La pregunta no puede ser mayor a 264 caracteres',
      )

    // Si no hay errores
    return new EnunciadoPregunta(enunciado)
  }
}
