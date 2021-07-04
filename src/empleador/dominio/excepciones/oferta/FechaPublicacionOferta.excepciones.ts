import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaPublicacionOfertaVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaPublicacionOfertaVacia')
  }
}

export class FechaPublicacionOfertaInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaPublicacionOfertaInvalida')
  }
}
