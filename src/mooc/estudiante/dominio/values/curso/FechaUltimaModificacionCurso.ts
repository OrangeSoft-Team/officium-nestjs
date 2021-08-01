import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  FechaUltimaModificacionCursoInvalida,
} from '../../excepciones/curso/FechaUltimaModificacionCurso.excepciones'

export class FechaUltimaModificacionCurso implements IValueObject {
  private constructor(private readonly fecha: Date) {}

  public obtenerFecha() {
    return this.fecha
  }

  public esIgual(fechaModificacion: FechaUltimaModificacionCurso): boolean {
    return this.fecha == fechaModificacion.obtenerFecha()
  }

  public static crear(fecha?: Date): FechaUltimaModificacionCurso {
    if (fecha)
      if (!(fecha instanceof Date))
        throw new FechaUltimaModificacionCursoInvalida(
          'La fecha de modificacion del curso no es una fecha valida.',
        )
    // si no hay errores  
    return new FechaUltimaModificacionCurso(fecha)
  }
}
