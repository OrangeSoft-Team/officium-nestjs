import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Direccion } from '../entidades/Direccion'
import { Empresa } from '../entidades/Empresa'
import { Habilidad } from '../entidades/Habilidad'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { CorreoElectronicoEmpresa } from '../values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'
import { IdentificadorEstado } from '../values/estado/IdentificadorEstado'
import { CategoriaHabilidad } from '../values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../values/habilidad/NombreHabilidad'
import { IdentificadorPais } from '../values/pais/IdentificadorPais'

export interface DatosRestaurarDireccion {
  identificador: IdentificadorDireccion
  identificadorCiudad: IdentificadorCiudad
  identificadorEstado: IdentificadorEstado
  identificadorPais: IdentificadorPais
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
}

export interface DatosRestaurarHabilidad {
  identificador: IdentificadorHabilidad
  nombre: NombreHabilidad
  categoria: CategoriaHabilidad
}

export interface DatosRestaurarEmpresa {
  identificador: IdentificadorEmpresa
  nombre: NombreEmpresa
  correoElectronico: CorreoElectronicoEmpresa
  estatus: EstatusEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
  habilidades: DatosRestaurarHabilidad[]
  direccion: DatosRestaurarDireccion
}

export abstract class RestaurarEmpresa implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarEmpresa): Empresa {
    const direccion = Direccion.restaurar({
      ...datos.direccion,
    })

    const habilidades = datos.habilidades?.map((habilidad) =>
      Habilidad.restaurar({ ...habilidad }),
    )

    const empresa = Empresa.restaurar({
      ...datos,
      direccion,
      habilidades,
    })

    return empresa
  }
}
