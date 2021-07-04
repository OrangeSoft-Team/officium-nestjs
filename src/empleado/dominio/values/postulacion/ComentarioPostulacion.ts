import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  ComentarioPostulacionVacio,
  LongitudInvalidaComentarioPostulacion,
} from '../../excepciones/postulacion/ComentarioPostulacion.excepciones'

export class ComentarioPostulacion extends ValueObject {
  private constructor(private readonly comentario: string) {
    super()
  }

  public obtenerComentario() {
    return this.comentario
  }

  public esIgual(comentarioPostulacion: ComentarioPostulacion): boolean {
    return this.comentario == comentarioPostulacion.comentario
  }

  public static crear(comentario: string) {
    // No debe ser vacio
    if (comentario == null || comentario == undefined || comentario == '') {
      throw new ComentarioPostulacionVacio(
        'El comentario de la postulación no debe estar vacio.',
      )
    }

    const comentarioPostulacion = new ComentarioPostulacion(comentario)

    // Debe contener al menos 16 caracteres
    if (comentario.length < 16)
      throw new LongitudInvalidaComentarioPostulacion(
        'El comentario de la postulación de la oferta laboral debe contener como mínimo 16 caracteres.',
      )
    // Debe contener como maximo 256 caracteres
    if (comentario.length > 256)
      throw new LongitudInvalidaComentarioPostulacion(
        'El comentario de la postulación de la oferta laboral debe contener como máximo 256 caracteres.',
      )
    // Si no hay errores
    return comentarioPostulacion
  }
}
