import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstatusEstudianteVacio implements IExcepcion {
  public readonly origen = 'EstatusEstudianteVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EstatusEstudianteInvalido implements IExcepcion {
  public readonly origen = 'EstatusEmpleadoInvalido'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
