import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstatusEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'EstatusEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class EstatusEmpleadoInvalido implements IExcepcion {
  public readonly nombre = 'EstatusEmpleadoInvalido'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
