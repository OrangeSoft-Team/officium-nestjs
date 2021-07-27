import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empresa } from '../entidades/Empresa'
import { CorreoElectronicoEmpresa } from '../values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'

export interface DatosRestaurarEmpresa {
  identificador: IdentificadorEmpresa
  nombre: NombreEmpresa
  correoElectronico: CorreoElectronicoEmpresa
  estatus: EstatusEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
}

export abstract class RestaurarEmpresa implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarEmpresa): Empresa {
    return Empresa.restaurar(datos)
  }
}
