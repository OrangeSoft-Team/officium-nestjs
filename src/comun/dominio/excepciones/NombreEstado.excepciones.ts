import { Excepcion } from '../Excepcion'
import { NombreEstado } from '../values/NombreEstado'

export class NombreEstadoVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombreEstadoVacio')
  }
}

export class LongitudInvalidaNombreEstado extends Excepcion {
  public constructor(valor: NombreEstado, error: string) {
    super(valor, error, 'LongitudInvalidaNombreEstado')
  }
}
