import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorLeccionVacio implements IExcepcion {
  public readonly origen = 'IdentificadorLeccionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}