export interface CiudadExistePersistenciaDTO {
  idEstado: string
  idCiudad: string
}

export interface IRepositorioCiudades {
  existe(query: CiudadExistePersistenciaDTO): Promise<boolean>
}
