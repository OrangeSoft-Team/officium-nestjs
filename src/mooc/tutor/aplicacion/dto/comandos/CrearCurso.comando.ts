type ESCALA_VALORES = 'HORA' | 'DIA' | 'SEMANA' | 'MES'

export interface HabilidadesRespuestaDTO {
      idHabilidad: string
}

export interface CrearCursoComandoDTO {
      titulo: string
      valorDuracion: number
      escalaDuracion: ESCALA_VALORES
      uuidHabilidades?: HabilidadesRespuestaDTO[]
}