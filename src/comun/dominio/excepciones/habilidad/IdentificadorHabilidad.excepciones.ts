import { IExcepcion } from '../../../dominio/IExcepcion'
export class IdentificadorHabilidadVacio implements IExcepcion {
  public readonly origen = 'IdentificadorHabilidadVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
