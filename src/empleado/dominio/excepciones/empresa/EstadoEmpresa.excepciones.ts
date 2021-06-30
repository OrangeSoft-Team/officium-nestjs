import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { EstadoEmpresa } from '../../values/empresa/EstadoEmpresa'

export class EstadoEmpresaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EstadoEmpresaVacio')
  }
}

export class EstadoEmpresaInvalido extends Excepcion {
  public constructor(valor: EstadoEmpresa, error: string) {
    super(valor, error, 'EstadoEmpresaInvalido')
  }
}
