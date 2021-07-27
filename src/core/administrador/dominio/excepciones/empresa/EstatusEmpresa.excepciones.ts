import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstatusEmpresaVacio implements IExcepcion {
  public readonly origen = 'EstatusEmpresaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EstatusEmpresaInvalido implements IExcepcion {
  public readonly origen = 'EstatusEmpresaInvalido'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
