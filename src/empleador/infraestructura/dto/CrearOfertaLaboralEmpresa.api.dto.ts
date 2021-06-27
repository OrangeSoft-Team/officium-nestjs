export interface CrearOfertaLaboralEmpresaApiDTO {
  uuidEmpresa: string
  titulo: string
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: 'hora' | 'día' | 'semana' | 'mes'
  turnoTrabajo: 'diurno' | 'nocturno' | 'mixto'
  numeroVacantes: number
}
