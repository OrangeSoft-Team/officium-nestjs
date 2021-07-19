import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class GeneroEmpleadoVacio implements IExcepcion {
  public readonly origen = 'GeneroEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class GeneroEmpleadoInvalido implements IExcepcion {
  public readonly origen = 'GeneroEmpleadoInvalido'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
