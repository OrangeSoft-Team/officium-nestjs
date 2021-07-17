import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NumeroTelefonicoEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'NumeroTelefonicoEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaNumeroTelefonicoEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaNumeroTelefonicoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class FormatoIncorrectoNumeroTelefonicoEmpleado implements IExcepcion {
  public readonly nombre = 'FormatoIncorrectoNumeroTelefonicoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
