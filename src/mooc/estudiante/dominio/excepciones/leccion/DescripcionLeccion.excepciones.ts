import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class DescripcionLeccionVacio implements IExcepcion {
  public readonly origen = 'DescripcionLeccionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaDescripcionLeccion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaDescripcionLeccion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}