import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class NombreEmpresaExperienciaLaboralVacio implements IExcepcion {
  public readonly origen = 'NombreEmpresaExperienciaLaboralVacio'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class LongitudInvalidaNombreEmpresaExperienciaLaboral
  implements IExcepcion
{
  public readonly origen = 'LongitudInvalidaNombreEmpresaExperienciaLaboral'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
