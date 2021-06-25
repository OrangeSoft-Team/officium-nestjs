import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { NombreEmpleador } from '../../values/empleador/NombreEmpleador'

export class NombreEmpleadorVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombreEmpleadorVacio')
  }
}

export class LongitudInvalidaNombreEmpleador extends Excepcion {
  public constructor(valor: NombreEmpleador, error: string) {
    super(valor, error, 'LongitudInvalidaNombreEmpleador')
  }
}
