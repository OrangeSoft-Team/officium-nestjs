import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class FechaInicioExperienciaLaboralVacia implements IExcepcion {
  public readonly origen = 'FechaInicioExperienciaLaboralVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaInicioExperienciaLaboralInvalida implements IExcepcion {
  public readonly origen = 'FechaInicioExperienciaLaboralInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaFinExperienciaLaboralVacia implements IExcepcion {
  public readonly origen = 'FechaFinExperienciaLaboralVacia'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaFinExperienciaLaboralInvalida implements IExcepcion {
  public readonly origen = 'FechaFinExperienciaLaboralInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class FechaFinNoMayorDeFechaInicioExperienciaLaboral
  implements IExcepcion
{
  public readonly origen = 'FechaFinNoMayorDeFechaInicioExperienciaLaboral'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
