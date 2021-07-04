import { Excepcion } from '../Excepcion'

export class NombrePaisVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombrePaisVacio')
  }
}

export class LongitudInvalidaNombrePais extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombrePais')
  }
}
