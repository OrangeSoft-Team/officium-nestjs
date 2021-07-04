import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'

export interface EmpresaExisteDTO {
  existe: boolean
}
export interface IRepositorioEmpresa {
  existe(solicitud: IdentificadorDTO): Promise<EmpresaExisteDTO>
}
