import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class ExperienciaLaboralNoExiste implements IExcepcion {
  public readonly origen = 'ExperienciaLaboralNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
