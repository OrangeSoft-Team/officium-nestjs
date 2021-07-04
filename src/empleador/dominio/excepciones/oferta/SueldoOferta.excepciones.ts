import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class SueldoOfertaInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'SueldoOfertaInvalido')
  }
}

export class SueldoOfertaNoEsNumero extends Excepcion {
  public constructor(error: string) {
    super(error, 'SueldoOfertaNoEsNumero')
  }
}

export class SueldoOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'SueldoOfertaVacio')
  }
}
