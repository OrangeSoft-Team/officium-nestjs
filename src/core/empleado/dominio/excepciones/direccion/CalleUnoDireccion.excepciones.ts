import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CalleUnoDireccionVacia implements IExcepcion {
  public readonly nombre = 'CalleUnoDireccionVacia'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaCalleUnoDireccion implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaCalleUnoDireccion'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
