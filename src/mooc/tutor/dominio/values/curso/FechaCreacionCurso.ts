import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  FechaCreacionCursoVacia,
  FechaCreacionCursoInvalida,
} from '../../excepciones/curso/FechaCreacionCurso.excepciones'

export class FechaCreacionCurso implements IValueObject {
  private constructor(private readonly fecha: Date) {}

  public obtenerFecha() {
    return this.fecha
  }

  public esIgual(fechaCreacion: FechaCreacionCurso): boolean {
    return this.fecha == fechaCreacion.obtenerFecha()
  }

  public static crear(fecha: Date): FechaCreacionCurso {
     
    // Valida que no se presenten errores
    if (!fecha)
      throw new FechaCreacionCursoVacia(
        'La fecha de creacion del curso no debe estar vacía.',
      )

    if (!(fecha instanceof Date))
      throw new FechaCreacionCursoInvalida(
        'La fecha de creacion del curso no es una fecha valida.',
      )
    // Si no hay errores
    return new FechaCreacionCurso(fecha)
  }
}
