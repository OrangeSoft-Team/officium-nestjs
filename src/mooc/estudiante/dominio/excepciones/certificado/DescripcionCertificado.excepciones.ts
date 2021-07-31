import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class DescripcionCertificadoVacio implements IExcepcion {
  public readonly origen = 'DescripcionCertificadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaDescripcionCertificado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaDescripcionCertificado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}