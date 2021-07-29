import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaNacimientoEmpleadoVacia implements IExcepcion {
  public readonly origen = 'FechaNacimientoEmpleadoVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaNacimientoEmpleadoInvalida implements IExcepcion {
  public readonly origen = 'FechaNacimientoEmpleadoInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
