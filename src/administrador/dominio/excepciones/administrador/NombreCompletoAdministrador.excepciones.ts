import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class NombresAdministradorVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'NombresAdministradorVacio')
  }
}

export class LongitudInvalidaNombreAdministrador extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaNombreAdministrador')
  }
}
