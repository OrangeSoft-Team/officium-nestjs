export interface EstudiantePersistenciaDTO {
    uuidEstudiante: string
    estatus: string
}

export interface IRepositorioEstudiantes {
    existe(uuidEstudiante: string): Promise<boolean>
    consultar(uuidEstudiante: string): Promise<EstudiantePersistenciaDTO>
}