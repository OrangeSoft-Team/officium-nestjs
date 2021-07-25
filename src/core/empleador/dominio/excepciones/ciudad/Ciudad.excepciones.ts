import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CiudadNoExiste implements IExcepcion {
  public readonly origen = 'CiudadNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
