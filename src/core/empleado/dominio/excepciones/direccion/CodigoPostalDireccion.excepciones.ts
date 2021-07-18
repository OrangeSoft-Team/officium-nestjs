import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CodigoPostalDireccionVacio implements IExcepcion {
  public readonly nombre = 'CodigoPostalDireccionVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaCodigoPostalDireccion implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaCodigoPostalDireccion'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
