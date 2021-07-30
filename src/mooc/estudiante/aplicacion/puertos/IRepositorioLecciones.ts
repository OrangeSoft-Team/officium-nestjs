export interface LeccionesCursoPersistenciaDTO {
    uuidCurso: string
  }
  
  export interface LeccionesPersistenciaDTO {
    uuid: string
    titulo: string
  }
  
  export interface IRepositorioLecciones {
    listar(query: LeccionesCursoPersistenciaDTO): Promise<LeccionesPersistenciaDTO[]>
  }