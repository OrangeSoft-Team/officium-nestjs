import { Excepcion } from '../Excepcion'

export class NombreCiudadVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombreCiudadVacio')
  }
}

export class LongitudInvalidaNombreCiudad extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombreCiudad')
  }
}
