import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class PrimerNombreEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'PrimerNombreEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaPrimerNombreEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaPrimerNombreEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class PrimerApellidoEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'PrimerApellidoEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaPrimerApellidoEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaPrimerApellidoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaSegundoNombreEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaSegundoNombreEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class LongitudInvalidaSegundoApellidoEmpleado implements IExcepcion {
  public readonly nombre = 'LongitudInvalidaSegundoApellidoEmpleado'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
