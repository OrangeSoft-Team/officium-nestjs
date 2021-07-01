import { Excepcion } from '../../../comun/dominio/Excepcion'

export class EmpleadoNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EmpleadoNoExiste')
  }
}
