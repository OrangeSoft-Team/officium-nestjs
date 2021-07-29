import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class TituloLeccionVacio implements IExcepcion {
  public readonly origen = 'TituloLeccionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaTituloLeccion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaTituloLeccion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}