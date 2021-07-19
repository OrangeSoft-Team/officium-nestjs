import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EmpleadoNoEsMayorDeEdad implements IExcepcion {
  public readonly origen = 'EmpleadoNoEsMayorDeEdad'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
