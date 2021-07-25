import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Direccion } from '../entidades/Direccion'
import { Empresa } from '../entidades/Empresa'
import { Habilidad } from '../entidades/Habilidad'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'
import { IdentificadorEstado } from '../values/estado/IdentificadorEstado'
import { CategoriaHabilidad } from '../values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../values/habilidad/NombreHabilidad'
import { IdentificadorPais } from '../values/pais/IdentificadorPais'

export interface DatosCrearDireccionEmpresa {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  identificadorCiudad: IdentificadorCiudad
  identificadorEstado: IdentificadorEstado
  identificadorPais: IdentificadorPais
}

export interface DatosCrearHabilidadEmpresa {
  identificador: IdentificadorHabilidad
  nombre: NombreHabilidad
  categoria: CategoriaHabilidad
}

export interface DatosEditarPerfilEmpresa {
  nombre: NombreEmpresa
  direccion: DatosCrearDireccionEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
  habilidades?: DatosCrearHabilidadEmpresa[]
}

export abstract class EditarPerfilEmpresa implements IServicioDominio {
  public static editar(
    datos: DatosEditarPerfilEmpresa,
    empresa: Empresa,
  ): Empresa {
    const direccion = Direccion.crear(datos.direccion)

    const habilidades = datos.habilidades?.map((habilidad) =>
      Habilidad.restaurar(habilidad),
    )

    empresa.editarPerfil(
      datos.nombre,
      direccion,
      datos.requisitosEspeciales,
      habilidades,
    )

    return empresa
  }
}
