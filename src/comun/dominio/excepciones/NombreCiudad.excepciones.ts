import { Excepcion } from '../Excepcion'
import { NombreCiudad } from '../values/NombreCiudad'

export class NombreCiudadVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombreCiudadVacio')
  }
}

export class LongitudInvalidaNombreCiudad extends Excepcion {
  public constructor(valor: NombreCiudad, error: string) {
    super(valor, error, 'LongitudInvalidaNombreCiudad')
  }
}
