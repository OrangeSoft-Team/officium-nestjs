import { Excepcion } from 'src/comun/dominio/Excepcion'
import { NombreCompletoEmpleado } from '../../values/empleado/NombreCompletoEmpleado'

export class NombresEmpleadoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombresEmpleadoVacio')
  }
}

export class LongitudInvalidaNombreEmpleado extends Excepcion {
  public constructor(valor: NombreCompletoEmpleado, error: string) {
    super(valor, error, 'LongitudInvalidaNombreEmpleado')
  }
}
