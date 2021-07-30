import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorCuestionarioVacio implements IExcepcion {
  public readonly origen = 'IdentificadorCuestionarioVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
