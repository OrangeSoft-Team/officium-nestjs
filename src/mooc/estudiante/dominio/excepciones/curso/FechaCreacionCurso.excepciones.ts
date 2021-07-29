import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaCreacionCursoVacia implements IExcepcion {
  public readonly origen = 'FechaCreacionCursoVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaCreacionCursoInvalida implements IExcepcion {
    public readonly origen = 'FechaCreacionCursoInvalida'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }