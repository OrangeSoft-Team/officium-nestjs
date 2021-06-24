import { Excepcion } from '../Excepcion'
import { NombreMunicipio } from '../values/NombreMunicipio'

export class NombreMunicipioVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombreMunicipioVacio')
  }
}

export class LongitudInvalidaNombreMunicipio extends Excepcion {
  public constructor(valor: NombreMunicipio, error: string) {
    super(valor, error, 'LongitudInvalidaNombreMunicipio')
  }
}
