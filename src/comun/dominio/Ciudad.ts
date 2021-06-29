import { Entidad } from './Entidad'
import { Identificador } from './values/Identificador'
import { NombreCiudad } from './values/NombreCiudad'

export interface DatosCiudad {
  identificador: Identificador
  nombre: NombreCiudad
}

export class Ciudad extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreCiudad,
  ) {
    super(identificador)
  }

  // getters
  public obtenerNombre() {
    return this.nombre
  }

  public static crear(datos: DatosCiudad): Ciudad {
    return new Ciudad(datos.identificador, datos.nombre)
  }
}
