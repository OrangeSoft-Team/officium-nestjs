import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaNacimientoAdministradorVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaNacimientoAdministradorVacio')
  }
}

export class FechaNacimientoAdministradorInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaNacimientoAdministradorInvalida')
  }
}

export class AdministradorMenorDeEdad extends Excepcion {
  public constructor(error: string) {
    super(error, 'EmpleadoMenorDeEdad')
  }
}
