import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class GeneroAdministradorVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'GeneroAdministradorVacio')
  }
}

export class GeneroAdministradorInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'GeneroAdministradorInvalido')
  }
}
