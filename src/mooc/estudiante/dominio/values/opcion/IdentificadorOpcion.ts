import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorOpcionVacio } from '../../excepciones/opcion/IdentificadorOpcion.excepciones'

export class IdentificadorOpcion implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorOpcion): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorOpcion {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorOpcionVacio(
        'El identificador de la experiencia laboral no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorOpcion(id)
  }
}
