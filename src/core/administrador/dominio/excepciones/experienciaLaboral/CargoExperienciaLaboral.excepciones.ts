import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CargoExperienciaLaboralVacio implements IExcepcion {
  public readonly origen = 'CargoExperienciaLaboralVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCargoExperienciaLaboral implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCargoExperienciaLaboral'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
