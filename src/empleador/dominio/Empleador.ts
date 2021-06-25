import { Direccion } from '../../comun/dominio/Direccion'
import { Entidad } from '../../comun/dominio/Entidad'
import { CorreoElectronico } from '../../comun/dominio/values/CorreoElectronico'
import { Identificador } from '../../comun/dominio/values/Identificador'
import { NumeroTelefonico } from '../../comun/dominio/values/NumeroTelefonico'
import { OfertaLaboral } from './OfertaLaboral'
import { EstadoEmpleador } from './values/empleador/EstadoEmpleador'
import { NombreEmpleador } from './values/empleador/NombreEmpleador'

export interface DatosEmpleador {
  identificador: Identificador
  nombre: NombreEmpleador
  correo: CorreoElectronico
  telefono: NumeroTelefonico
  direccion: Direccion
  estado: EstadoEmpleador
  ofertasLaborales: OfertaLaboral[]
}

export class Empleador extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreEmpleador,
    private correo: CorreoElectronico,
    private telefono: NumeroTelefonico,
    private direccion: Direccion,
    private estado: EstadoEmpleador,
    private ofertasLaborales?: OfertaLaboral[],
  ) {
    super(identificador)
  }

  public static crear(datos: DatosEmpleador): Empleador {
    return new Empleador(
      datos.identificador,
      datos.nombre,
      datos.correo,
      datos.telefono,
      datos.direccion,
      datos.estado,
      datos.ofertasLaborales,
    )
  }
}
