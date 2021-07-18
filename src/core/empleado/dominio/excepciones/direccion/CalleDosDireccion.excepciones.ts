import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class LongitudInvalidaCalleDosDireccion implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaCalleDosDireccion'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
