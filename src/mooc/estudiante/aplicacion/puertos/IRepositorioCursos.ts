export interface ListadoCursosPersistenciaDTO {
    uuid: string
    titulo: string
    estatus: string 
    fechaCreacion: Date
}

export interface IRepositorioCursos {
    listar(): Promise<ListadoCursosPersistenciaDTO[]>
}