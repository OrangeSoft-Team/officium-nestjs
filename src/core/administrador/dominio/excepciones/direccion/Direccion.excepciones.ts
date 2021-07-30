import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class DireccionNoExiste implements IExcepcion {
  public readonly origen = 'DireccionNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
