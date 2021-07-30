import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class IntentosPermitidosCuestionarioVacio implements IExcepcion {
  public readonly origen = 'IntentosPermitidosCuestionarioVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaIntentosPermitidosCuestionario
  implements IExcepcion
{
  public readonly origen = 'LongitudInvalidaIntentosPermitidosCuestionario'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
