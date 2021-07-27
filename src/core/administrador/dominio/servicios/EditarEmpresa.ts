import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empresa } from '../entidades/Empresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'

export interface DatosEditarEmpresa {
  nombre: NombreEmpresa
  estatus: EstatusEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
}

export abstract class EditarEmpresa implements IServicioDominio {
  public static editar(datos: DatosEditarEmpresa, empresa: Empresa): void {
    empresa.editarDatos(datos.nombre, datos.estatus, datos.requisitosEspeciales)
  }
}
