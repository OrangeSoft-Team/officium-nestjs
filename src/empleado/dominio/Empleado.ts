import { Direccion } from 'src/comun/dominio/Direccion'
import { Entidad } from 'src/comun/dominio/Entidad'
import { CalleDireccion } from 'src/comun/dominio/values/CalleDireccion'
import { CodigoPostalDireccion } from 'src/comun/dominio/values/CodigoPostalDireccion'
import { Identificador } from 'src/comun/dominio/values/Identificador'
import { NumeroTelefonico } from 'src/comun/dominio/values/NumeroTelefonico'
import { FechaNacimientoEmpleado } from './values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from './values/empleado/GeneroEmpleado'
import { NombreCompletoEmpleado } from './values/empleado/NombreCompletoEmpleado'

export interface DatosEmpleado {
  identificador: Identificador
  nombreCompletoEmpleado: NombreCompletoEmpleado
  genero: GeneroEmpleado
  direccion: CalleDireccion
  codigoPostal: CodigoPostalDireccion
  numero: NumeroTelefonico
  fechaNacimiento: FechaNacimientoEmpleado
}

export class Empleado extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombreCompletoEmpleado: NombreCompletoEmpleado,
    private genero: GeneroEmpleado,
    private direccion: CalleDireccion,
    private codigoPostal: CodigoPostalDireccion,
    private numero: NumeroTelefonico,
    private fechaNacimiento: FechaNacimientoEmpleado,
  ) {
    super(identificador)
  }
  public static crear(datos: DatosEmpleado): Empleado {
    return new Empleado(
      datos.identificador,
      datos.nombreCompletoEmpleado,
      datos.genero,
      datos.direccion,
      datos.codigoPostal,
      datos.numero,
      datos.fechaNacimiento,
    )
  }
}
