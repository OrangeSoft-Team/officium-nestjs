import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstatusEmpleadoVacio implements IExcepcion {
  public readonly origen = 'EstatusEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EstatusEmpleadoInvalido implements IExcepcion {
  public readonly origen = 'EstatusEmpleadoInvalido'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
