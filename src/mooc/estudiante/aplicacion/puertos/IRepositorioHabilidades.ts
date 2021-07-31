export interface HabilidadesCursoPersistenciaDTO {
    uuidCurso: string
  }
  
  export interface HabilidadesPersistenciaDTO {
    uuid: string
    nombre: string
    categoria: string
  }
  
  export interface IRepositorioHabilidades {
    listar(query: HabilidadesCursoPersistenciaDTO): Promise<HabilidadesPersistenciaDTO[]>
  }