import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class EstadoEmpresaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoEmpresaVacio')
  }
}

export class EstadoEmpresaInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoEmpresaInvalido')
  }
}
