import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { GeneroAdministrador } from '../../values/administrador/GeneroAdministrador'

export class GeneroAdministradorVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'GeneroAdministradorVacio')
  }
}

export class GeneroAdministradorInvalido extends Excepcion {
  public constructor(valor: GeneroAdministrador, error: string) {
    super(valor, error, 'GeneroAdministradorInvalido')
  }
}
