import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorCiudadVacio } from '../../excepciones/ciudad/IdentificadorCiudad.excepciones'

export class IdentificadorCiudad implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorCiudad): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorCiudad {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorCiudadVacio(
        'El identificador de la dirección no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorCiudad(id)
  }
}
