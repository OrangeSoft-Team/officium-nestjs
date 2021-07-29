import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CodigoPostalDireccionVacio implements IExcepcion {
  public readonly origen = 'CodigoPostalDireccionVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCodigoPostalDireccion implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCodigoPostalDireccion'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
