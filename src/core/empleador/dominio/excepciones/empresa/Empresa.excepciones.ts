import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class AutentificacionEmpresaInvalida implements IExcepcion {
  public readonly origen = 'AutentificacionEmpresaInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
