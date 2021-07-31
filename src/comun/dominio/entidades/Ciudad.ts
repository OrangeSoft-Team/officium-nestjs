import { Entidad } from '../Entidad'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { NombreCiudad } from '../values/ciudad/NombreCiudad'

export interface DatosCiudad {
  identificador: IdentificadorCiudad
  nombre: NombreCiudad
}

export class Ciudad extends Entidad {
  public constructor(
    private readonly identificador: IdentificadorCiudad,
    private readonly nombre: NombreCiudad,
  ) {
    super()
  }

  public esIgual(ciudad: Ciudad): boolean {
    return this.identificador.esIgual(ciudad.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerNombre() {
    return this.nombre.obtenerNombre()
  }

  public static restaurar(datos: DatosCiudad): Ciudad {
    return new Ciudad(datos.identificador, datos.nombre)
  }
}
