export interface LeccionesCursoPersistenciaDTO {
    uuidCurso: string
  }
  
  export interface LeccionesPersistenciaDTO {
    uuid: string
    titulo: string
  }

  export interface VerLeccionPersistenciaDTO {
    uuidLeccion: string
  }

  export interface LeccionPersistenciaDTO {
    uuid: string
    titulo: string
    descripcion: string
    contenido: string
  }
  
  export interface IRepositorioLecciones {
    listar(query: LeccionesCursoPersistenciaDTO): Promise<LeccionesPersistenciaDTO[]>
    consultar(query: VerLeccionPersistenciaDTO): Promise<LeccionPersistenciaDTO>
  }