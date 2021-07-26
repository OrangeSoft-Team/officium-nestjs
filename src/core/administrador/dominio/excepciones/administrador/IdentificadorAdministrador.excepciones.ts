import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorAdministradorVacio implements IExcepcion {
  public readonly origen = 'IdentificadorAdministradorVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
