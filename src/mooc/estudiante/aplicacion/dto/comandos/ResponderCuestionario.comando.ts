export interface OpcionPreguntaDTO {
    uuidPregunta: string
    uuidOpcion: string
}

export interface ResponderCuestionarioComandoDTO{
    uuidCurso: string
    uuidCuestionario: string
    uuidEstudiante: string
    respuestasCuestionario: OpcionPreguntaDTO[]
}