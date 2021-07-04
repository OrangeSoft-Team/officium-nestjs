import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'
import {
  EmpresaExisteDTO,
  IRepositorioEmpresa,
} from '../../../aplicacion/puertos/IRepositorioEmpresa'

export class RepositorioEmpresa implements IRepositorioEmpresa {
  public async existe(solicitud: IdentificadorDTO): Promise<EmpresaExisteDTO> {
    return { existe: solicitud?.id == '1' || solicitud?.id == '3' }
  }
}
