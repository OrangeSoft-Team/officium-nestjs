export interface PaisExistePersistenciaDTO {
  id: string
}

export interface IRepositorioPaises {
  existe(query: PaisExistePersistenciaDTO): Promise<boolean>
}
