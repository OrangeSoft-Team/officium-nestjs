import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class EmpresaNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'EmpresaNoExiste')
  }
}
