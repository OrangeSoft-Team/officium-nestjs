import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class GeneroEmpleadoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'GeneroEmpleadoVacio')
  }
}

export class GeneroEmpleadoInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'GeneroEmpleadoInvalido')
  }
}
