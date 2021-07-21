import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class AutentificacionAdministradorInvalida
  implements IExcepcionAplicacion
{
  public readonly origen = 'AutentificacionAdministradorInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
