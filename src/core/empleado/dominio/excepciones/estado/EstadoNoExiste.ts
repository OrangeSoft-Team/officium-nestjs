import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class EstadoNoExiste implements IExcepcionAplicacion {
  public readonly origen = 'EstadoNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
