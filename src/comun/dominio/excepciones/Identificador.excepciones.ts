import { Excepcion } from '../Excepcion'
import { Identificador } from '../values/Identificador'

export class IdentificadorVacio extends Excepcion {
  public constructor(valor: Identificador, error: string) {
    super(valor, error, 'IdentificadorVacio')
  }
}
