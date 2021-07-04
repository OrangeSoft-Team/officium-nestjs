import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class TurnoOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'TurnoOfertaVacio')
  }
}

export class TurnoOfertaInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'TurnoOfertaInvalido')
  }
}
