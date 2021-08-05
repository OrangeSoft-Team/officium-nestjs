export interface HabilidadesCursoPersistenciaDTO {
    uuidCurso: string
  }
  
  export interface HabilidadesPersistenciaDTO {
    uuid: string
  }
  
  export interface IRepositorioHabilidades {
    listar(query: HabilidadesCursoPersistenciaDTO): Promise<HabilidadesPersistenciaDTO[]>
  }