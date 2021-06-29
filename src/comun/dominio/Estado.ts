import { Entidad } from './Entidad'
import { Ciudad } from './Ciudad'
import { Identificador } from './values/Identificador'
import { NombreEstado } from './values/NombreEstado'

export interface DatosEstado {
  identificador: Identificador
  nombre: NombreEstado
  ciudades?: Ciudad[]
}

export class Estado extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreEstado,
    private ciudades?: Ciudad[],
  ) {
    super(identificador)
  }

  // getters
  public obtenerNombre() {
    return this.nombre
  }
  public obtenerCiudades() {
    return this.ciudades
  }

  public static crear(datos: DatosEstado): Estado {
    return new Estado(datos.identificador, datos.nombre, datos.ciudades)
  }
}
