import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NombreHabilidadVacio implements IExcepcion {
  public readonly origen = 'NombreHabilidadVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombreHabilidad implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNombreHabilidad'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
