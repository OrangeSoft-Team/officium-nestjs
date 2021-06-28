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
  idEmpresa: string
}

export interface IdentificadorEmpresaDTO {
  idEmpresa: string
}

export interface IRepositorioOfertaLaboral {
  crear(datos: OfertaLaboralPersistenciaDTO): Promise<void>

  obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]>
}
