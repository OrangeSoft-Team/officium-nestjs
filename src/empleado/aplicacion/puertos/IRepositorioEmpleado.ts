import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'

export interface EmpleadoExisteDTO {
  existe: boolean
}

export interface IRepositorioEmpleado {
  existe(solicitud: IdentificadorDTO): Promise<EmpleadoExisteDTO>
}
