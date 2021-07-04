export interface CrearOfertaLaboralAdministradorSolicitudDTO {
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

export interface CrearOfertaLaboralAdministradorEntidadDTO
  extends CrearOfertaLaboralAdministradorSolicitudDTO {
  id: string
}
