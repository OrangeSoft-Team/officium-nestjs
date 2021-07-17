import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorEmpleadoVacio implements IExcepcion {
  public readonly nombre = 'IdentificadorEmpleadoVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
