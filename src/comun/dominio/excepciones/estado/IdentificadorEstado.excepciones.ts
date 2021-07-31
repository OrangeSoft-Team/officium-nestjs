import { IExcepcion } from '../../IExcepcion'

export class IdentificadorEstadoVacio implements IExcepcion {
  public readonly origen = 'IdentificadorEstadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
