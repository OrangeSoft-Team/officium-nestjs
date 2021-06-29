import { Entidad } from './Entidad'
import { Estado } from './Estado'
import { Identificador } from './values/Identificador'
import { NombrePais } from './values/NombrePais'

export interface DatosPais {
  identificador: Identificador
  nombre: NombrePais
  estados?: Estado[]
}

export class Pais extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombrePais,
    private estados?: Estado[],
  ) {
    super(identificador)
  }

  // getters
  public obtenerNombre() {
    return this.nombre
  }
  public obtenerEstados() {
    return this.estados
  }

  public static crear(datos: DatosPais): Pais {
    return new Pais(datos.identificador, datos.nombre, datos.estados)
  }
}
