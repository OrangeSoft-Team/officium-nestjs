export interface VerDetalleOfertaLaboralRespuestaDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  fechaModificacion: Date
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turno: string
  numeroVacantes: number
}

export interface VerDetalleOfertaLaboralSolicitudDTO {
  idEmpresa: string
  idOferta: string
}
