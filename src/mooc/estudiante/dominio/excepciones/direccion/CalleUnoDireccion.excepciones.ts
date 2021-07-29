import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CalleUnoDireccionVacia implements IExcepcion {
  public readonly origen = 'CalleUnoDireccionVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCalleUnoDireccion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCalleUnoDireccion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
