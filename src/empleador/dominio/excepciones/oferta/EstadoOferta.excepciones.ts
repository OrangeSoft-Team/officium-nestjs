import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class EstadoOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoOfertaVacio')
  }
}

export class EstadoOfertaInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoOfertaInvalido')
  }
}
