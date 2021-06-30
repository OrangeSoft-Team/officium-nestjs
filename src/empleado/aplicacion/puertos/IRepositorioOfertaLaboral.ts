export interface OfertaLaboralPersistenciaDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  fechaModificacion?: Date
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimada: number
  escalaDuracion: string
  turno: string
  numeroVacantes: number
  estado: string
  nombreEmpresa: string
}


export interface IRepositorioOfertaLaboral {
  listar(): Promise<OfertaLaboralPersistenciaDTO[]>
}
