import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class NombreEmpresaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombreEmpresaVacio')
  }
}

export class LongitudInvalidaNombreEmpresa extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombreEmpresa')
  }
}
