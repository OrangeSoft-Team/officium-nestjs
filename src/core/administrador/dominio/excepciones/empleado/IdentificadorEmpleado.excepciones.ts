import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorEmpleadoVacio implements IExcepcion {
  public readonly origen = 'IdentificadorEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
