import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NombreEmpresaVacio implements IExcepcion {
  public readonly origen = 'NombreEmpresaVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombreEmpresa implements IExcepcion {
  public readonly origen = 'LongitudInvalidaNombreEmpresa'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
