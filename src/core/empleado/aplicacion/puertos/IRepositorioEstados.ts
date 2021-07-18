export interface EstadoExisteQueryDTO {
  idPais: string
  idEstado: string
}

export interface IRepositorioEstados {
  existe(query: EstadoExisteQueryDTO): Promise<boolean>
}
