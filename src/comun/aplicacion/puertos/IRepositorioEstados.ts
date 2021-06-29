import { IdentificadorDTO } from '../dto/Identificador.dto'

export interface EstadoPersistenciaDTO {
  idEstado: string
  idPais: string
  nombreEstado: string
}

export interface IRepositorioEstados {
  obtenerPorPais(solicitud: IdentificadorDTO): Promise<EstadoPersistenciaDTO[]>
}
