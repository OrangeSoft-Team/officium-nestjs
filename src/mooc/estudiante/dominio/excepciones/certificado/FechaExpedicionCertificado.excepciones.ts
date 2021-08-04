import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaExpedicionCertificadoVacia implements IExcepcion {
  public readonly origen = 'FechaExpedicionCertificadoVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaExpedicionCertificadoInvalida implements IExcepcion {
  public readonly origen = 'FechaExpedicionCertificadoInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}