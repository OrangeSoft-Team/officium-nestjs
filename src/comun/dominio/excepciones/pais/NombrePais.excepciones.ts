import { IExcepcion } from '../../IExcepcion'

export class NombrePaisVacio implements IExcepcion {
  public readonly origen = 'NombrePaisVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombrePais implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNombrePais'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
