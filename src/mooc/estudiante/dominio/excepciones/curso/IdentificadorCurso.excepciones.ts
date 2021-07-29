import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorCursoVacio implements IExcepcion {
  public readonly origen = 'IdentificadorCursoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}