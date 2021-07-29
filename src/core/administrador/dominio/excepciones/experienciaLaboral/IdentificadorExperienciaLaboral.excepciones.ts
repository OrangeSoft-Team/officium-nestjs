import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IdentificadorExperienciaLaboralVacio implements IExcepcion {
  public readonly origen = 'IdentificadorExperienciaLaboralVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
