import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class CiudadNoExiste implements IExcepcionAplicacion {
  public readonly origen = 'CiudadNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
