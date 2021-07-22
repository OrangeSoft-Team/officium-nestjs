import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class AutentificacionAdministradorInvalida implements IExcepcion {
  public readonly origen = 'AutentificacionAdministradorInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
