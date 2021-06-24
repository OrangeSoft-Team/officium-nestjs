import { Entidad } from './Entidad'
import { Identificador } from './values/Identificador'
import { NombreMunicipio } from './values/NombreMunicipio'

export interface DatosMunicipio {
  identificador: Identificador
  nombre: NombreMunicipio
}

export class Municipio extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreMunicipio,
  ) {
    super(identificador)
  }

  public static crear(datos: DatosMunicipio): Municipio {
    return new Municipio(datos.identificador, datos.nombre)
  }
}
