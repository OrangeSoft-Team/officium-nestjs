import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorAdministradorVacio } from '../../excepciones/administrador/IdentificadorAdministrador.excepciones'

export class IdentificadorAdministrador implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorAdministrador): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorAdministrador {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorAdministradorVacio(
        'El identificador del administrador no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorAdministrador(id)
  }
}
