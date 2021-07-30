import { Entidad } from '../../../../comun/dominio/Entidad'
import { CorrectoOpcion } from '../values/opcion/CorrectoOpcion'
import { IdentificadorOpcion } from '../values/opcion/IdentificadorOpcion'
import { ValorOpcion } from '../values/opcion/ValorOpcion'

export interface DatosOpcion {
  identificador: IdentificadorOpcion
  valor: ValorOpcion
  correcto: CorrectoOpcion
}

export class Opcion extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorOpcion,
    private valor: ValorOpcion,
    private correcto: CorrectoOpcion,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(opcion: Opcion): boolean {
    return this.identificador.esIgual(opcion.obtenerIdentificador())
  }

  public obtenerValor() {
    return this.valor
  }

  public obtenerCorrecto() {
    return this.correcto
  }

  public static crear(datos: DatosOpcion): Opcion {
    return new Opcion(datos.identificador, datos.valor, datos.correcto)
  }

  public static restaurar(datos: DatosOpcion): Opcion {
    return new Opcion(datos.identificador, datos.valor, datos.correcto)
  }
}
