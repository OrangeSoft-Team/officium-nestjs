import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class PaisNoExiste implements IExcepcion {
  public readonly origen = 'PaisNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
