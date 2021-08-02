export interface ConsultarCuestionarioQueryDTO {
    uuidCurso: string
}

export interface OpcionesPreguntaDTO{
    uuid: string
    valor: string
}

export interface PreguntasCuestionarioDTO {
    uuid: string
    enunciado: string
    tipo: string
    ponderacion: number
    opciones: OpcionesPreguntaDTO[]
}

export interface ConsultarCuestionarioRespuestaDTO {
    uuid: string
    valorDuracion: number
    escalaDuracion: string
    intentosPermitidos: number
    preguntasCuestionario: PreguntasCuestionarioDTO[]
}