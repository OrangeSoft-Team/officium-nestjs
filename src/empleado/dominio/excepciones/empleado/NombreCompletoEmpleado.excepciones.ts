import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class NombresEmpleadoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombresEmpleadoVacio')
  }
}

export class LongitudInvalidaNombreEmpleado extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombreEmpleado')
  }
}
