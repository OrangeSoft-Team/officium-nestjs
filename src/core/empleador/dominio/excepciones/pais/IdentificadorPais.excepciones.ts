import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorPaisVacio implements IExcepcion {
  public readonly origen = 'IdentificadorPaisVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
