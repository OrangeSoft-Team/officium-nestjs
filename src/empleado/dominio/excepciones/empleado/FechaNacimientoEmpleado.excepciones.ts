import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { FechaNacimientoEmpleado } from '../../values/empleado/FechaNacimientoEmpleado'

export class FechaNacimientoEmpleadoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaNacimientoEmpleadoVacio')
  }
}

export class FechaNacimientoEmpleadoInvalida extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaNacimientoEmpleadoInvalida')
  }
}

export class EmpleadoMenorDeEdad extends Excepcion {
  public constructor(valor: FechaNacimientoEmpleado, error: string) {
    super(valor, error, 'EmpleadoMenorDeEdad')
  }
}
