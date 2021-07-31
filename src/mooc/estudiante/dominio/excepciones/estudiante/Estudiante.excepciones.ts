import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EstudianteNoExiste implements IExcepcion {
  public readonly origen = 'EstudianteNoExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
