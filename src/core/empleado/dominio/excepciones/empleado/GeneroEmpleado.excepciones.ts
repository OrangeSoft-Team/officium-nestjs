import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class GeneroEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'GeneroEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class GeneroEmpleadoInvalido implements IExcepcion {
  public readonly nombre = 'GeneroEmpleadoInvalido'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
