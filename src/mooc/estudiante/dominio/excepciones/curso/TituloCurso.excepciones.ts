import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class TituloCursoVacio implements IExcepcion {
  public readonly origen = 'TituloCursoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaTituloCurso implements IExcepcion {
    public readonly origen = 'LongitudInvalidaTituloCurso'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }