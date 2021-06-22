import { Identificador } from './Identificador'
import { Excepcion } from './Excepcion'

export class IdentificadorVacio extends Excepcion {
  public constructor(valor: Identificador, error: string) {
    super(valor, error)
  }
}
