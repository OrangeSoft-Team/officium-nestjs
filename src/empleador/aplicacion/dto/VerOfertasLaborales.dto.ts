export interface VerOfertasLaboralesActivasRespuestaDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  cargo: string
  sueldo: number
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turnoTrabajo: string
  numeroVacantes: number
}

export interface VerOfertasLaboralesActivasSolicitudDTO {
  idEmpresa: string
}
