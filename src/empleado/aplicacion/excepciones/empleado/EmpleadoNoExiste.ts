import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class EmpleadoNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'EmpleadoNoExiste')
  }
}
