export interface EstadoExistePersistenciaDTO {
  idPais: string
  idEstado: string
}

export interface IRepositorioEstados {
  existe(query: EstadoExistePersistenciaDTO): Promise<boolean>
}
