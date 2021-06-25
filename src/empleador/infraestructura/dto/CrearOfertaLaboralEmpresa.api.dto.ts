export interface CrearOfertaLaboralEmpresaApiDTO {
  uuidEmpresa: string
  titulo: string
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turnoTrabajo: string
  numeroVacantes: number
}
