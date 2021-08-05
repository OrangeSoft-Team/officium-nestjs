import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  TituloCursoVacio,
  LongitudInvalidaTituloCurso,
} from '../../excepciones/curso/TituloCurso.excepciones'

export class TituloCurso implements IValueObject {
  private constructor(private readonly titulo: string) {}

  public obtenerTitulo() {
    return this.titulo
  }

  public esIgual(titulo: TituloCurso): boolean {
    return this.titulo == titulo.obtenerTitulo()
  }

  public static crear(titulo: string): TituloCurso {
    
    // Valida que no haya errores
    if (titulo == null || titulo == undefined || titulo == '')
      throw new TituloCursoVacio('El titulo del curso no puede estar vacio.')
    if (titulo.length < 4)
      throw new LongitudInvalidaTituloCurso(
        'El titulo del curso no puede ser menor a 4 caracteres',
      )

    if (titulo.length > 80)
      throw new LongitudInvalidaTituloCurso(
        'El titulo del curso no puede ser mayor a 80 caracteres',
      )

    // Si no hay errores
    return new TituloCurso(titulo)
  }
}
