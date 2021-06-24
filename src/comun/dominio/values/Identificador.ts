import { IdentificadorVacio } from '../excepciones/Identificador.excepciones'
import { ValueObject } from '../ValueObject'

export class Identificador extends ValueObject {
  private constructor(private readonly id: string) {
    super()
  }

  public esIgual(identificador: Identificador): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): Identificador {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorVacio(
        new Identificador(id),
        'El identificador no puede estar vacio.',
      )
    // Si no hay errores
    return new Identificador(id)
  }
}
