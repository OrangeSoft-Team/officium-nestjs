import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class OfertaLaboralYaExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'OfertaLaboralYaExiste')
  }
}
