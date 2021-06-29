import { IdentificadorDTO } from '../dto/Identificador.dto'

export interface CiudadPersistenciaDTO {
  idCiudad: string
  idEstado: string
  nombreCiudad: string
}

export interface IRepositorioCiudades {
  obtenerPorEstado(
    solicitud: IdentificadorDTO,
  ): Promise<CiudadPersistenciaDTO[]>
}
