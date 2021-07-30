import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorrectoOpcionVacio implements IExcepcion {
  public readonly origen = 'CorrectoOpcionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
