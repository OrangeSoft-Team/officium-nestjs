import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'
import {
  EmpleadoExisteDTO,
  IRepositorioEmpleado,
} from '../../../aplicacion/puertos/IRepositorioEmpleado'

export class RepositorioEmpleado implements IRepositorioEmpleado {
  public async existe(solicitud: IdentificadorDTO): Promise<EmpleadoExisteDTO> {
    return { existe: solicitud.id == '1300b8ee-73a0-42de-8464-ed4998dc9a10' }
  }
}
