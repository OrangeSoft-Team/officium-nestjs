import { Excepcion } from '../Excepcion'

export class CorreoElectronicoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'CorreoElectronicoVacio')
  }
}

export class LongitudInvalidaCorreoElectronico extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaCorreoElectronico')
  }
}

export class FormatoInvalidoCorreoElectronico extends Excepcion {
  public constructor(error: string) {
    super(error, 'FormatoInvalidoCorreoElectronico')
  }
}
