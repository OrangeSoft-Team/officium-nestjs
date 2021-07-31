export interface PaisPersistenciaDTO {
  id: string
  nombre: string
}

export interface IRepositorioUbicaciones {
  listarPaises(): Promise<PaisPersistenciaDTO[]>
}
