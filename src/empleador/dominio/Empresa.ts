import { Direccion } from '../../comun/dominio/Direccion'
import { Entidad } from '../../comun/dominio/Entidad'
import { CorreoElectronico } from '../../comun/dominio/values/CorreoElectronico'
import { Identificador } from '../../comun/dominio/values/Identificador'
import { NumeroTelefonico } from '../../comun/dominio/values/NumeroTelefonico'
import { OfertaLaboral } from './OfertaLaboral'
import { EstadoEmpresa } from './values/Empresa/EstadoEmpresa'
import { NombreEmpresa } from './values/Empresa/NombreEmpresa'

export interface DatosEmpresa {
  identificador: Identificador
  nombre: NombreEmpresa
  correo: CorreoElectronico
  telefono: NumeroTelefonico
  direccion: Direccion
  estado: EstadoEmpresa
  ofertasLaborales?: OfertaLaboral[]
}

export class Empresa extends Entidad {
  private constructor(
    identificador: Identificador,
    private nombre: NombreEmpresa,
    private correo: CorreoElectronico,
    private telefono: NumeroTelefonico,
    private direccion: Direccion,
    private estado: EstadoEmpresa,
    private ofertasLaborales?: OfertaLaboral[],
  ) {
    super(identificador)
  }

  public static crear(datos: DatosEmpresa): Empresa {
    return new Empresa(
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
