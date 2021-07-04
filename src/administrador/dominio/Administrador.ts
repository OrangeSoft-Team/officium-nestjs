import { Entidad } from 'src/comun/dominio/Entidad'
import { Identificador } from 'src/comun/dominio/values/Identificador'
import { NumeroTelefonico } from 'src/comun/dominio/values/NumeroTelefonico'
import { Direccion } from '../../comun/dominio/Direccion'
//import { PostulacionOferta } from './PostulacionOferta'
import { FechaNacimientoAdministrador } from './values/administrador/FechaNacimientoAdministrador'
import { GeneroAdministrador } from './values/administrador/GeneroAdministrador'
import { NombreCompletoAdministrador } from './values/administrador/NombreCompletoAdministrador'

export interface DatosAdministrador {
  identificador: Identificador
  nombreCompletoEmpleado: NombreCompletoAdministrador
  genero: GeneroAdministrador
  direccion: Direccion
  numero: NumeroTelefonico
  fechaNacimiento: FechaNacimientoAdministrador
}

export class Administrador extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombreCompletoEmpleado: NombreCompletoAdministrador,
    private genero: GeneroAdministrador,
    private direccion: Direccion,
    private numero: NumeroTelefonico,
    private fechaNacimiento: FechaNacimientoAdministrador,
  ) {
    super(identificador)
  }
  public static crear(datos: DatosAdministrador): Administrador {
    return new Administrador(
      datos.identificador,
      datos.nombreCompletoEmpleado,
      datos.genero,
      datos.direccion,
      datos.numero,
      datos.fechaNacimiento,
    )
  }
}
