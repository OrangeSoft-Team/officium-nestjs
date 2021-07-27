import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorreoElectronicoEmpresaVacio implements IExcepcion {
  public readonly origen = 'CorreoElectronicoEmpresaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCorreoElectronicoEmpresa implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCorreoElectronicoEmpresa'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoCorreoElectronicoEmpresa implements IExcepcion {
  public readonly origen = 'FormatoIncorrectoCorreoElectronicoEmpresa'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
