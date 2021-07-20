import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class PaisNoExiste implements IExcepcionAplicacion {
  public readonly origen = 'PaisNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
