export interface CrearOfertaLaboralSolicitudDTO {
  idEmpresa: string
  titulo: string
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: 'hora' | 'día' | 'semana' | 'mes'
  turnoTrabajo: 'diurno' | 'nocturno' | 'mixto'
  numeroVacantes: number
}

export interface CrearOfertaLaboralEntidadDTO
  extends CrearOfertaLaboralSolicitudDTO {
  id: string
}
