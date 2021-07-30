export interface HabilidadPersistenciaDTO {
  id: string
  nombre: string
  categoria: string
}

export interface IRepositorioHabilidades {
  obtenerPorIdEmpleado(id: string): Promise<HabilidadPersistenciaDTO[]>
}
