import { Excepcion } from '../Excepcion'

export class NumeroTelefonicoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NumeroTelefonicoVacio')
  }
}

export class LongitudInvalidaNumeroTelefonico extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNumeroTelefonico')
  }
}

export class FormatoInvalidoNumeroTelefonico extends Excepcion {
  public constructor(error: string) {
    super(error, 'FormatoInvalidoNumeroTelefonico')
  }
}
