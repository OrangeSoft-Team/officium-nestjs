import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EmpresaNoExiste implements IExcepcion {
  public readonly origen = 'EmpresaNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EmpresaYaExiste implements IExcepcion {
  public readonly origen = 'EmpresaYaExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
