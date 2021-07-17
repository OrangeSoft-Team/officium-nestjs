import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorreoElectronicoEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'CorreoElectronicoEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaCorreoElectronicoEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaCorreoElectronicoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class FormatoIncorrectoCorreoElectronicoEmpleado implements IExcepcion {
  public readonly nombre = 'FormatoIncorrectoCorreoElectronicoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
