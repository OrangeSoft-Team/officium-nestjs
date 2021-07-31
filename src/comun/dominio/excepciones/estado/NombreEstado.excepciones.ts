import { IExcepcion } from '../../IExcepcion'

export class NombreEstadoVacio implements IExcepcion {
  public readonly origen = 'NombreEstadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombreEstado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNombreEstado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
