import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NumeroTelefonicoEmpleadoVacio implements IExcepcion {
  public readonly origen = 'NumeroTelefonicoEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNumeroTelefonicoEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNumeroTelefonicoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoNumeroTelefonicoEmpleado implements IExcepcion {
  public readonly origen = 'FormatoIncorrectoNumeroTelefonicoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
