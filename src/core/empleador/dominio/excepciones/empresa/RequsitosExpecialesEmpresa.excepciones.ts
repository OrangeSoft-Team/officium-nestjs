import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class LongitudInvalidaRequisitosEspecialesEmpresa implements IExcepcion {
  public readonly origen = 'LongitudInvalidaRequisitosEspecialesEmpresa'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
