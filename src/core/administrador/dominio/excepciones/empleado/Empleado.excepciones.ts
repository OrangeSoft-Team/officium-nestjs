import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EmpleadoNoExiste implements IExcepcion {
  public readonly origen = 'EmpleadoNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
