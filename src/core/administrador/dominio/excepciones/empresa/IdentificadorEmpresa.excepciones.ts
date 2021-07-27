import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorEmpresaVacio implements IExcepcion {
  public readonly origen = 'IdentificadorEmpresaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
