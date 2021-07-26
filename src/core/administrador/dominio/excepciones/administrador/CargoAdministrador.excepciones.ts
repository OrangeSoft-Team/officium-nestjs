import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CargoAdministradorVacio implements IExcepcion {
  public readonly origen = 'CargoAdministradorVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCargoAdministrador implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCargoAdministrador'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
