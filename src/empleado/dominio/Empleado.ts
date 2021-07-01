import { Entidad } from 'src/comun/dominio/Entidad'
import { Identificador } from 'src/comun/dominio/values/Identificador'
import { NumeroTelefonico } from 'src/comun/dominio/values/NumeroTelefonico'
import { Direccion } from '../../comun/dominio/Direccion'
import { PostulacionOferta } from './PostulacionOferta'
import { FechaNacimientoEmpleado } from './values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from './values/empleado/GeneroEmpleado'
import { NombreCompletoEmpleado } from './values/empleado/NombreCompletoEmpleado'

export interface DatosEmpleado {
  identificador: Identificador
  nombreCompletoEmpleado: NombreCompletoEmpleado
  genero: GeneroEmpleado
  direccion: Direccion
  numero: NumeroTelefonico
  fechaNacimiento: FechaNacimientoEmpleado
  postulaciones?: PostulacionOferta[]
}

export class Empleado extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombreCompletoEmpleado: NombreCompletoEmpleado,
    private genero: GeneroEmpleado,
    private direccion: Direccion,
    private numero: NumeroTelefonico,
    private fechaNacimiento: FechaNacimientoEmpleado,
    private postulaciones?: PostulacionOferta[],
  ) {
    super(identificador)
  }
  public static crear(datos: DatosEmpleado): Empleado {
    return new Empleado(
      datos.identificador,
      datos.nombreCompletoEmpleado,
      datos.genero,
      datos.direccion,
      datos.numero,
      datos.fechaNacimiento,
    )
  }
}
