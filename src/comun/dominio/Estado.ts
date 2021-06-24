import { Entidad } from './Entidad'
import { Municipio } from './Municipio'
import { Identificador } from './values/Identificador'
import { NombreEstado } from './values/NombreEstado'

export interface DatosEstado {
  identificador: Identificador
  nombre: NombreEstado
  municipios: Municipio[]
}

export class Estado extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreEstado,
    private municipios: Municipio[],
  ) {
    super(identificador)
  }

  public static crear(datos: DatosEstado): Estado {
    return new Estado(datos.identificador, datos.nombre, datos.municipios)
  }
}
