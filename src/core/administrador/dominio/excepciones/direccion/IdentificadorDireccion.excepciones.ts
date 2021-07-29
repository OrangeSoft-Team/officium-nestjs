import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorDireccionVacio implements IExcepcion {
  public readonly origen = 'IdentificadorDireccionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
