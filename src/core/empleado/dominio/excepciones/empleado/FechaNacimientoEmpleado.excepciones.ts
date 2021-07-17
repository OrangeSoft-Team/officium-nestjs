import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaNacimientoEmpleadoVacia implements IExcepcion {
  public readonly nombre = 'FechaNacimientoEmpleadoVacia'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class FechaNacimientoEmpleadoInvalida implements IExcepcion {
  public readonly nombre = 'FechaNacimientoEmpleadoInvalida'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
