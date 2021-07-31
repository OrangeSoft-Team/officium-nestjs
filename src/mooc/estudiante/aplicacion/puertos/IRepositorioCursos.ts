export interface ListadoCursosPersistenciaDTO {
  uuid: string
  titulo: string
  estatus: string
  fechaCreacion: Date
}

export interface ConsultarCursoPersistenciaDTO {
  uuid: string
}

export interface CursoPersistenciaDTO {
  uuid: string
  titulo: string
  estatus: string
  valorDuracion: number
  escalaDuracion: string
  fechaCreacion: Date
  fechaUltimaModificacion?: Date
}

export interface IRepositorioCursos {
  listar(): Promise<ListadoCursosPersistenciaDTO[]>
  consultar(query: ConsultarCursoPersistenciaDTO): Promise<CursoPersistenciaDTO>
}
