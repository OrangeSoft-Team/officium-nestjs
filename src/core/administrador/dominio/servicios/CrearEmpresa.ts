import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empresa } from '../entidades/Empresa'
import { CorreoElectronicoEmpresa } from '../values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'

export interface DatosCrearEmpresa {
  identificador: IdentificadorEmpresa
  correoElectronico: CorreoElectronicoEmpresa
  nombre: NombreEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
}

export abstract class CrearEmpresa implements IServicioDominio {
  public static crear(datos: DatosCrearEmpresa): Empresa {
    return Empresa.crear({
      identificador: datos.identificador,
      correoElectronico: datos.correoElectronico,
      estatus: EstatusEmpresa.crear('ACTIVO'),
      nombre: datos.nombre,
      requisitosEspeciales: datos.requisitosEspeciales,
    })
  }
}
