interface OpcionesPreguntaApiDTO {
  valor: string
  correcto: boolean
}

interface PreguntasCrearCuestionarioApiDTO {
  enunciado: string
  tipo: string
  ponderacion: number
  opciones: OpcionesPreguntaApiDTO[]
}

export interface CrearCuestionarioApiDTO {
  valorDuracion: number
  escalaDuracion: string
  intentosPermitidos: number
  preguntas: PreguntasCrearCuestionarioApiDTO[]
}
