import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EmpleadoNoEsMayorDeEdad implements IExcepcion {
  public readonly nombre = 'EmpleadoNoEsMayorDeEdad'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
