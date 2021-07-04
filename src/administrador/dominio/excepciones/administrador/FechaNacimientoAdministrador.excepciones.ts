import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { FechaNacimientoAdministrador } from '../../values/administrador/FechaNacimientoAdministrador'

export class FechaNacimientoAdministradorVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaNacimientoAdministradorVacio')
  }
}

export class FechaNacimientoAdministradorInvalida extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaNacimientoAdministradorInvalida')
  }
}

export class AdministradorMenorDeEdad extends Excepcion {
  public constructor(valor: FechaNacimientoAdministrador, error: string) {
    super(valor, error, 'EmpleadoMenorDeEdad')
  }
}
