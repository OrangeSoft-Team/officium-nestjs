export interface PersistirOfertaLaboralDTO {
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
  idEmpresa: string
}

export interface IRepositorioOfertaLaboral {
  crear(datos: PersistirOfertaLaboralDTO): Promise<void>
}
