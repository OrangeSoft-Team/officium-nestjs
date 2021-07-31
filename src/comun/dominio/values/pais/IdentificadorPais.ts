import { IdentificadorPaisVacio } from '../../excepciones/pais/IdentificadorPais.excepciones'
import { IValueObject } from '../../IValueObject'

export class IdentificadorPais implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorPais): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorPais {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorPaisVacio(
        'El identificador del país no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorPais(id)
  }
}
