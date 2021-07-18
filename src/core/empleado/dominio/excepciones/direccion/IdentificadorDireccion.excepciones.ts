import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorDireccionVacio implements IExcepcion {
  public readonly nombre = 'IdentificadorDireccionVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
