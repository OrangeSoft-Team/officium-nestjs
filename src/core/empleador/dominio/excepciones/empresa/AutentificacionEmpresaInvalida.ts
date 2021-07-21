import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class AutentificacionEmpresaInvalida implements IExcepcionAplicacion {
  public readonly origen = 'AutentificacionEmpresaInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
