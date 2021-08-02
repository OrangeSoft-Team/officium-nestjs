interface OpcionesPreguntaApiDTO {
  uuid: string
  valor: string
}

interface PreguntasCuestionarioApiDTO {
  uuid: string
  enunciado: string
  tipo: string
  ponderacion: number
  opciones: OpcionesPreguntaApiDTO[]
}

export interface RespuestasOpcionesApiDTO{
  uuidPregunta: string
  uuidOpcion: string
}

export interface CuestionarioCursoApiDTO {
  uuid: string
  valorDuracion: number
  escalaDuracion: string
  intentosPermitidos: number
  preguntasCuestionario: PreguntasCuestionarioApiDTO[]
}
