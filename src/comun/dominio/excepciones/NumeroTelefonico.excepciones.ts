import { Excepcion } from '../Excepcion'
import { NumeroTelefonico } from '../values/NumeroTelefonico'

export class NumeroTelefonicoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NumeroTelefonicoVacio')
  }
}

export class LongitudInvalidaNumeroTelefonico extends Excepcion {
  public constructor(valor: NumeroTelefonico, error: string) {
    super(valor, error, 'LongitudInvalidaNumeroTelefonico')
  }
}

export class FormatoInvalidoNumeroTelefonico extends Excepcion {
  public constructor(valor: NumeroTelefonico, error: string) {
    super(valor, error, 'FormatoInvalidoNumeroTelefonico')
  }
}
