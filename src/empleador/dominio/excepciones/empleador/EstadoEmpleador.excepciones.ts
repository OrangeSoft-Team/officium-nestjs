import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { EstadoEmpleador } from '../../values/empleador/EstadoEmpleador'

export class EstadoEmpleadorVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EstadoEmpleadorVacio')
  }
}

export class EstadoEmpleadorInvalido extends Excepcion {
  public constructor(valor: EstadoEmpleador, error: string) {
    super(valor, error, 'EstadoEmpleadorInvalido')
  }
}
