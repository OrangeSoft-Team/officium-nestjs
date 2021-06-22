import { ValueObject } from './ValueObject'

export class Identificador extends ValueObject {
  private constructor(private readonly id: string) {
    super()
  }

  public esIgual(identificador: Identificador): boolean {
    return this.id == identificador.id
  }

  public static create(id: string): Identificador {
    // No debe ser vacio
    if (id == null || id == undefined) throw new Error()
    // Si no hay errores
    return new Identificador(id)
  }
}
