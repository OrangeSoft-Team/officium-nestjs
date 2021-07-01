import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { NombreEmpresa } from '../../values/empresa/NombreEmpresa'

export class NombreEmpresaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombreEmpresaVacio')
  }
}

export class LongitudInvalidaNombreEmpresa extends Excepcion {
  public constructor(valor: NombreEmpresa, error: string) {
    super(valor, error, 'LongitudInvalidaNombreEmpresa')
  }
}
