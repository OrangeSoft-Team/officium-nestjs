import { ValueObject } from '../ValueObject'
import { IdentificadorVacio } from '../excepciones/Identificador.excepciones'

export class Identificador extends ValueObject {
  private constructor(private readonly id: string) {
    super()
  }

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: Identificador): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): Identificador {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorVacio('El identificador no puede estar vacio.')
    // Si no hay errores
    return new Identificador(id)
  }
}
