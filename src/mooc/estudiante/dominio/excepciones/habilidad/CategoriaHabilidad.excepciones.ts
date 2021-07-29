import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CategoriaHabilidadVacio implements IExcepcion {
  public readonly origen = 'CategoriaHabilidadVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCategoriaHabilidad implements IExcepcion {
    public readonly origen = 'LongitudInvalidaCategoriaHabilidad'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }