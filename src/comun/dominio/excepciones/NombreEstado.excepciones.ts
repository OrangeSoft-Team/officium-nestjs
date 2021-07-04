import { Excepcion } from '../Excepcion'

export class NombreEstadoVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombreEstadoVacio')
  }
}

export class LongitudInvalidaNombreEstado extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombreEstado')
  }
}
