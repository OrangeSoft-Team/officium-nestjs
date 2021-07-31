export interface PaisPersistenciaDTO {
  id: string
  nombre: string
}

export interface EstadoPersistenciaDTO {
  id: string
  nombre: string
}

export interface CiudadPersistenciaDTO {
  id: string
  nombre: string
}

export interface IRepositorioUbicaciones {
  listarPaises(): Promise<PaisPersistenciaDTO[]>

  listarEstadosPorIdPais(id: string): Promise<EstadoPersistenciaDTO[]>

  listarCiudadesPorIdEstado(id: string): Promise<CiudadPersistenciaDTO[]>
}
