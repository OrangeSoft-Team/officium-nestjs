import { Excepcion } from 'src/comun/dominio/Excepcion'
import { GeneroEmpleado } from '../../values/empleado/GeneroEmpleado'

export class GeneroEmpleadoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'GeneroEmpleadoVacio')
  }
}

export class GeneroEmpleadoInvalido extends Excepcion {
  public constructor(valor: GeneroEmpleado, error: string) {
    super(valor, error, 'GeneroEmpleadoInvalido')
  }
}
