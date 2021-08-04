export interface PreguntasPeticionDTO {
    uuidCuestionario: string
}

export interface OpcionesPreguntaDTO{
    uuid: string
    valor: string
    correcto: boolean
}

export interface PreguntasPersistenciaDTO {
    uuid: string
    enunciado: string
    tipo: string
    ponderacion: number
    opciones: OpcionesPreguntaDTO[]
}

export interface IRepositorioRespuestas {
    consultar(comando: PreguntasPeticionDTO): Promise<PreguntasPersistenciaDTO[]>
}