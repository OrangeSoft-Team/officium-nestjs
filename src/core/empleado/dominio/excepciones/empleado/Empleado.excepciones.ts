import { IExcepcion } from '../../../../../comun/dominio/IExcepcion'

export class EmpleadoNoEsMayorDeEdad implements IExcepcion {
  public readonly origen = 'EmpleadoNoEsMayorDeEdad'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class EmpleadoYaExiste implements IExcepcion {
  public readonly origen = 'EmpleadoYaExiste'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}

export class AutentificacionEmpleadoInvalida implements IExcepcion {
  public readonly origen = 'AutentificacionEmpleadoInvalida'
  public constructor(public readonly mensaje: string) {}

  public getError() {
    return {
      mensaje: this.mensaje,
      origen: this.origen,
    }
  }
}
