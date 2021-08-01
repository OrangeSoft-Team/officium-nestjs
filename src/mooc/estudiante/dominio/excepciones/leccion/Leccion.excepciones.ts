import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class LeccionNoExiste implements IExcepcion {
  public readonly origen = 'LeccionNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}