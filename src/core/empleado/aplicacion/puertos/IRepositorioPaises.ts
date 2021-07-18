interface PaisExisteQueryDTO {
  id: string
}

export interface IRepositorioPaises {
  existe(query: PaisExisteQueryDTO): Promise<boolean>
}
