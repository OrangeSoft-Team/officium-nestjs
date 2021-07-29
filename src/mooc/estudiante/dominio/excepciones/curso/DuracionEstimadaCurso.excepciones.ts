import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class DuracionEstimadaCursoVacio implements IExcepcion {
  public readonly origen = 'DuracionEstimadaCursoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class DuracionEscalaCursoInvalida implements IExcepcion {
    public readonly origen = 'DuracionEscalaCursoInvalida'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }

  export class LongitudInvalidaDuracionValorCurso implements IExcepcion {
    public readonly origen = 'LongitudInvalidaDuracionValorCurso'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }