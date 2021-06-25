import { Excepcion } from '../Excepcion'
import { NombrePais } from '../values/NombrePais'

export class NombrePaisVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombrePaisVacio')
  }
}

export class LongitudInvalidaNombrePais extends Excepcion {
  public constructor(valor: NombrePais, error: string) {
    super(valor, error, 'LongitudInvalidaNombrePais')
  }
}
