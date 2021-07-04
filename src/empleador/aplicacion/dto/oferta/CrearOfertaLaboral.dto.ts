export interface CrearOfertaLaboralSolicitudDTO {
  idEmpresa: string
  titulo: string
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turnoTrabajo: string
  numeroVacantes: number
}

export interface CrearOfertaLaboralEntidadDTO
  extends CrearOfertaLaboralSolicitudDTO {
  id: string
}
