import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorCiudadVacio implements IExcepcion {
  public readonly nombre = 'IdentificadorCiudadVacio'
  public constructor(public readonly error: string) {}

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
