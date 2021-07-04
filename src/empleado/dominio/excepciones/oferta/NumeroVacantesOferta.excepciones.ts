import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class NumeroVacantesOfertaInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'NumeroVacantesOfertaInvalido')
  }
}

export class NumeroVacantesOfertaNoEsNumero extends Excepcion {
  public constructor(error: string) {
    super(error, 'NumeroVacantesOfertaNoEsNumero')
  }
}

export class NumeroVacantesOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NumeroVacantesOfertaVacio')
  }
}
