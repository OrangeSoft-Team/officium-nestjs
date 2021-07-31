import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorCertificadoVacio implements IExcepcion {
  public readonly origen = 'IdentificadorCertificadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}