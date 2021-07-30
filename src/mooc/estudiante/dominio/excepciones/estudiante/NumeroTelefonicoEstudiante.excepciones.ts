import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NumeroTelefonicoEstudianteVacio implements IExcepcion {
  public readonly origen = 'NumeroTelefonicoEstudianteVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNumeroTelefonicoEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNumeroTelefonicoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FormatoIncorrectoNumeroTelefonicoEstudiante implements IExcepcion {
  public readonly origen = 'FormatoIncorrectoNumeroTelefonicoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
