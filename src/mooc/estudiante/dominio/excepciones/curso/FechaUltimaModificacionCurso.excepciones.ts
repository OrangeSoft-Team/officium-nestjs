import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaUltimaModificacionCursoInvalida implements IExcepcion {
  public readonly origen = 'FechaUltimaModificacionCursoInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
