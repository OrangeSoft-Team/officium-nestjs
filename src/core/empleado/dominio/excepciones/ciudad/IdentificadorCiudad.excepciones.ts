import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorCiudadVacio implements IExcepcion {
  public readonly origen = 'IdentificadorCiudadVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
