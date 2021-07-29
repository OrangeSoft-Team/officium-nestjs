import { Entidad } from '../../../../comun/dominio/Entidad'
import { IdentificadorPais } from '../values/pais/IdentificadorPais'
import { NombrePais } from '../values/pais/NombrePais'

export interface DatosPais {
  identificador: IdentificadorPais
  nombre: NombrePais
}

export class Pais extends Entidad {
  public constructor(
    private readonly identificador: IdentificadorPais,
    private nombre: NombrePais,
  ) {
    super()
  }

  public esIgual(pais: Pais): boolean {
    return this.identificador.esIgual(pais.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerNombre() {
    return this.nombre.obtenerNombre()
  }

  public static restaurar(datos: DatosPais): Pais {
    return new Pais(datos.identificador, datos.nombre)
  }
}
