import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstadoNoExiste implements IExcepcion {
  public readonly origen = 'EstadoNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
