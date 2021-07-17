import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NivelEducativoEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'NivelEducativoEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}

export class NivelEducativoEmpleadoInvalido implements IExcepcion {
  public readonly nombre = 'NivelEducativoEmpleadoInvalido'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
