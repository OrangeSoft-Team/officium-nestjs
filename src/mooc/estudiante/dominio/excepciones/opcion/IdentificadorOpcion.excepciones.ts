import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorOpcionVacio implements IExcepcion {
  public readonly origen = 'IdentificadorOpcionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}