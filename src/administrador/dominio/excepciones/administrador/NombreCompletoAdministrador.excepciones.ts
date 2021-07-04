import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { NombreCompletoAdministrador } from '../../values/administrador/NombreCompletoAdministrador'

export class NombresAdministradorVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NombresAdministradorVacio')
  }
}

export class LongitudInvalidaNombreAdministrador extends Excepcion {
  public constructor(valor: NombreCompletoAdministrador, error: string) {
    super(valor, error, 'LongitudInvalidaNombreAdministrador')
  }
}
