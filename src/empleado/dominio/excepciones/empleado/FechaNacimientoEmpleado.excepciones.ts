import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaNacimientoEmpleadoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaNacimientoEmpleadoVacio')
  }
}

export class FechaNacimientoEmpleadoInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaNacimientoEmpleadoInvalida')
  }
}

export class EmpleadoMenorDeEdad extends Excepcion {
  public constructor(error: string) {
    super(error, 'EmpleadoMenorDeEdad')
  }
}
