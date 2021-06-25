import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaPublicacionOfertaVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaPublicacionOfertaVacia')
  }
}

export class FechaPublicacionOfertaInvalida extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaPublicacionOfertaInvalida')
  }
}
