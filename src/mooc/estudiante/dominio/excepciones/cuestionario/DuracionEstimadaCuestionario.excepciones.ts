import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class DuracionEstimadaCuestionarioVacio implements IExcepcion {
  public readonly origen = 'DuracionEstimadaCuestionarioVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class DuracionEscalaCuestionarioInvalida implements IExcepcion {
  public readonly origen = 'DuracionEscalaCuestionarioInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaDuracionValorCuestionario implements IExcepcion {
  public readonly origen = 'LongitudInvalidaDuracionValorCuestionario'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
