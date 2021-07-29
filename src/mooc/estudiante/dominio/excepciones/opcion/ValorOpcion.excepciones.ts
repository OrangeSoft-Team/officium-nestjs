import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class ValorOpcionVacio implements IExcepcion {
  public readonly origen = 'ValoprOpcionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaValorOpcion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaValorOpcion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}