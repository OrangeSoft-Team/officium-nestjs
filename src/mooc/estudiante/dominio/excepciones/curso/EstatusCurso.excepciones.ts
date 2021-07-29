import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstatusCursoVacio implements IExcepcion {
  public readonly origen = 'EstatusCursoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EstatusCursoInvalido implements IExcepcion {
    public readonly origen = 'EstatusCursoInvalido'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }