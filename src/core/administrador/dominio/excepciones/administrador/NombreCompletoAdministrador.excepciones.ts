import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class PrimerNombreAdministradorVacio implements IExcepcion {
  public readonly origen = 'PrimerNombreAdministradorVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerNombreAdministrador implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerNombreAdministrador'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class PrimerApellidoAdministradorVacio implements IExcepcion {
  public readonly origen = 'PrimerApellidoAdministradorVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaPrimerApellidoAdministrador implements IExcepcion {
  public readonly origen = 'LongitudInvalidaPrimerApellidoAdministrador'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
