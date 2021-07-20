import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NivelEducativoEmpleadoVacio implements IExcepcion {
  public readonly origen = 'NivelEducativoEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class NivelEducativoEmpleadoInvalido implements IExcepcion {
  public readonly origen = 'NivelEducativoEmpleadoInvalido'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
