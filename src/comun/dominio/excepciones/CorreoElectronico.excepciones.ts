import { Excepcion } from '../Excepcion'
import { CorreoElectronico } from '../values/CorreoElectronico'

export class CorreoElectronicoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'CorreoElectronicoVacio')
  }
}

export class LongitudInvalidaCorreoElectronico extends Excepcion {
  public constructor(valor: CorreoElectronico, error: string) {
    super(valor, error, 'LongitudInvalidaCorreoElectronico')
  }
}

export class FormatoInvalidoCorreoElectronico extends Excepcion {
  public constructor(valor: CorreoElectronico, error: string) {
    super(valor, error, 'FormatoInvalidoCorreoElectronico')
  }
}
