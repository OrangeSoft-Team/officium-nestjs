import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class EmpleadoYaExiste implements IExcepcionAplicacion {
  public readonly origen = 'EmpleadoYaExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
