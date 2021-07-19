import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class PrimerNombreEmpleadoVacio implements IExcepcion {
  public readonly origen = 'PrimerNombreEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerNombreEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerNombreEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class PrimerApellidoEmpleadoVacio implements IExcepcion {
  public readonly origen = 'PrimerApellidoEmpleadoVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerApellidoEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerApellidoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaSegundoNombreEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaSegundoNombreEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaSegundoApellidoEmpleado implements IExcepcion {
  public readonly origen = 'LongitudInvalidaSegundoApellidoEmpleado'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
