type ESCALA_VALORES = 'HORA' | 'DIA' | 'SEMANA' | 'MES'
export interface CrearCursoApiDTO {
  titulo: string
  valorDuracion: number
  escalaDuracion: ESCALA_VALORES
  uuidHabilidades: string[]
}
