import { Excepcion } from '../Excepcion'

export class IdentificadorVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'IdentificadorVacio')
  }
}
