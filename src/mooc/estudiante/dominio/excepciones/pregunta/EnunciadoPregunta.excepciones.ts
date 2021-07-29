import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EnunciadoPreguntaVacio implements IExcepcion {
  public readonly origen = 'EnunciadoPreguntaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaEnunciadoPregunta implements IExcepcion {
    public readonly origen = 'LongitudInvalidaEnunciadoPregunta'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }