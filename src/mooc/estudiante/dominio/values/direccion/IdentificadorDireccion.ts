import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorDireccionVacio } from '../../excepciones/direccion/IdentificadorDireccion.excepciones'

export class IdentificadorDireccion implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorDireccion): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorDireccion {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorDireccionVacio(
        'El identificador de la dirección no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorDireccion(id)
  }
}
