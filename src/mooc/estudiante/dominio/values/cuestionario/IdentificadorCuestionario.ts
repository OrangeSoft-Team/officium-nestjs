import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorCuestionarioVacio } from '../../excepciones/cuestionario/IdentificadorCuestionario.excepciones'

export class IdentificadorCuestionario implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorCuestionario): boolean {
    return this.id == identificador.obtenerId()
  }

  public static crear(id: string): IdentificadorCuestionario {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorCuestionarioVacio(
        'El identificador de la cuestionario no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorCuestionario(id)
  }
}
