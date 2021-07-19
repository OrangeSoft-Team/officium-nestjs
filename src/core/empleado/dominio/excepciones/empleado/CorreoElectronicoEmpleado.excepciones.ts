import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorreoElectronicoEmpleadoVacio implements IExcepcion {
  public readonly origen = 'CorreoElectronicoEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCorreoElectronicoEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCorreoElectronicoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoCorreoElectronicoEmpleado implements IExcepcion {
  public readonly origen = 'FormatoIncorrectoCorreoElectronicoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
