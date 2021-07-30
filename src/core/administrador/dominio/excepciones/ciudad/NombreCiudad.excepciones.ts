import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NombreCiudadVacio implements IExcepcion {
  public readonly origen = 'NombreCiudadVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombreCiudad implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNombreCiudad'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
