import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorreoElectronicoAdministradorVacio implements IExcepcion {
  public readonly origen = 'CorreoElectronicoAdministradorVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCorreoElectronicoAdministrador
  implements IExcepcion
{
  public readonly origen = 'LongitudInvalidaCorreoElectronicoAdministrador'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoCorreoElectronicoAdministrador
  implements IExcepcion
{
  public readonly origen = 'FormatoIncorrectoCorreoElectronicoAdministrador'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
