import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class LongitudInvalidaCalleDosDireccion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCalleDosDireccion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
