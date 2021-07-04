import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class DuracionOfertaInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'DuracionOfertaInvalida')
  }
}

export class DuracionOfertaNoEsNumero extends Excepcion {
  public constructor(error: string) {
    super(error, 'DuracionOfertaNoEsNumero')
  }
}

export class DuracionOfertaVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'DuracionOfertaVacia')
  }
}

export class EscalaDuracionOfertaInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'EscalaDuracionOfertaInvalida')
  }
}

export class EscalaDuracionOfertaVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'EscalaDuracionOfertaVacia')
  }
}
