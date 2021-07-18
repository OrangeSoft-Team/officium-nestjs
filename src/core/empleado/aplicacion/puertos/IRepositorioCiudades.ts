export interface CiudadExisteQueryDTO {
  idEstado: string
  idCiudad: string
}

export interface IRepositorioCiudades {
  existe(query: CiudadExisteQueryDTO): Promise<boolean>
}
