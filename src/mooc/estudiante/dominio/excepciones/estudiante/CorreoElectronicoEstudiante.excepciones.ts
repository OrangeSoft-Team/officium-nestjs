import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class CorreoElectronicoEmpleadoVacio implements IExcepcion {
  public readonly origen = 'CorreoElectronicoEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaCorreoElectronicoEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaCorreoElectronicoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoCorreoElectronicoEstudiante
  implements IExcepcion
{
  public readonly origen = 'FormatoIncorrectoCorreoElectronicoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
