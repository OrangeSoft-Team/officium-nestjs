import { IdentificadorDTO } from '../dto/Identificador.dto'

export interface PaisPersistenciaDTO {
  id: string
  nombre: string
}

export interface PaisExisteDTO {
  existe: boolean
}

export interface IRepositorioPaises {
  existe(solicitud: IdentificadorDTO): Promise<PaisExisteDTO>
  obtenerTodos(): Promise<PaisPersistenciaDTO[]>
}
