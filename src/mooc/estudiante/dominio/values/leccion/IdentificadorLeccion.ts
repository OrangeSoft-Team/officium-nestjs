import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorLeccionVacio } from '../../excepciones/leccion/IdentificadorLeccion.excepciones'

export class IdentificadorLeccion implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorLeccion): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorLeccion {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorLeccionVacio(
        'El identificador de la leccion no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorLeccion(id)
  }
}
