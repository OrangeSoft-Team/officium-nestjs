import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

export class PaisNoExiste implements IExcepcionAplicacion {
  public readonly nombre = 'PaisNoExiste'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
