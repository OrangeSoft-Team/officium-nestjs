export abstract class Entidad {
  public esIgual(entidad: Entidad): boolean {
    if (entidad == null || entidad == undefined) return false
    if (this == entidad) return true
    return false
  }
}
