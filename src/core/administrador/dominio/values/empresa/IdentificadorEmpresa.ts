import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorEmpresaVacio } from '../../excepciones/empresa/IdentificadorEmpresa.excepciones'

export class IdentificadorEmpresa implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorEmpresa): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorEmpresa {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorEmpresaVacio(
        'El identificador de la empresa no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorEmpresa(id)
  }
}
