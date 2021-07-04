export interface ConsultarOfertasLaboralesAdministradorDTO {
  id: string
  titulo: string
  fecha: Date
  cargo: string
  sueldo: number
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turnoTrabajo: string
  numeroVacantes: number
  nombreEmpresa: string
}