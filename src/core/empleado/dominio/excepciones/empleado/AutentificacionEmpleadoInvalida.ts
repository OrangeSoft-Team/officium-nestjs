import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class AutentificacionEmpleadoInvalida implements IExcepcionAplicacion {
  public readonly origen = 'AutentificacionEmpleadoInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
