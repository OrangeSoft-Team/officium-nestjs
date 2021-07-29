import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorEstadoVacio } from '../../excepciones/estado/IdentificadorEstado.excepciones'

export class IdentificadorEstado implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorEstado): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorEstado {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorEstadoVacio(
        'El identificador del estado no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorEstado(id)
  }
}
