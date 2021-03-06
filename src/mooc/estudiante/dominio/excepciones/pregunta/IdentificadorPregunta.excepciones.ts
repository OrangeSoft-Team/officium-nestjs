import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorPreguntaVacio implements IExcepcion {
  public readonly origen = 'IdentificadorPreguntaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
