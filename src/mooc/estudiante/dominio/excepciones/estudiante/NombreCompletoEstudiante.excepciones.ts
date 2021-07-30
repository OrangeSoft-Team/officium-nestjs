import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class PrimerNombreEstudianteVacio implements IExcepcion {
  public readonly origen = 'PrimerNombreEstudianteVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerNombreEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerNombreEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class PrimerApellidoEstudianteVacio implements IExcepcion {
  public readonly origen = 'PrimerApellidoEstudianteVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerApellidoEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerApellidoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaSegundoNombreEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaSegundoNombreEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaSegundoApellidoEstudiante implements IExcepcion {
  public readonly origen = 'LongitudInvalidaSegundoApellidoEstudiante'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
