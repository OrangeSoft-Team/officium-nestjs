export interface HabilidadPersistenciaDTO {
  id: string
  nombre: string
  categoria: string
}

export interface IRepositorioHabilidades {
  listar(): Promise<HabilidadPersistenciaDTO[]>
}
