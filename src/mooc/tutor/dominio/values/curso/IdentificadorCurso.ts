import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorCursoVacio } from '../../excepciones/curso/IdentificadorCurso.excepciones'

export class IdentificadorCurso implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorCurso): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorCurso {
    
    // Valida si hay errores
    if (id == null || id == undefined || id == '')
      throw new IdentificadorCursoVacio(
        'El identificador del curso no puede estar vacio.',
      )
      
    // Si no hay errores
    return new IdentificadorCurso(id)
  }
}
