import { Identificador } from './values/Identificador'

export abstract class Entidad {
  public constructor(protected readonly id: Identificador) {}

  public esIgual(entidad: Entidad): boolean {
    if (entidad == null || entidad == undefined) return false
    if (this == entidad) return true
    return false
  }

  public obtenerIdentificador() {
    return this.id
  }
}
