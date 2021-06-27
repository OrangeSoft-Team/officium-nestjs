import { Excepcion } from '../../../comun/dominio/Excepcion'

export class EmpresaNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EmpresaNoExiste')
  }
}
