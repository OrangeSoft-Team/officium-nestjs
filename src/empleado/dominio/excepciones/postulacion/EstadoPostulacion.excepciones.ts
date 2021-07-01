import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { EstadoPostulacion } from '../../values/postulacion/EstadoPostulacion'

export class EstadoPostulacionVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EstadoPostulacionVacio')
  }
}

export class EstadoPostulacionInvalido extends Excepcion {
  public constructor(valor: EstadoPostulacion, error: string) {
    super(valor, error, 'EstadoPostulacionInvalido')
  }
}
