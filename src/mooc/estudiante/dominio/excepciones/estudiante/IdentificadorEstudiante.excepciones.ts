import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorEstudianteVacio implements IExcepcion {
  public readonly origen = 'IdentificadorEstudianteVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
