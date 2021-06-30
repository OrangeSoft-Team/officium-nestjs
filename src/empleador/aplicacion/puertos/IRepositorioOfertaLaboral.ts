export interface OfertaLaboralPersistenciaDTO {
  id: string
  idEmpresa?: string
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
}

export interface IdentificadorEmpresaDTO {
  idEmpresa: string
}

export interface IdentificadorOfertaLaboralDTO {
  idOfertaLaboral: string
  idEmpresa: string
}

export interface IRepositorioOfertaLaboral {
  crear(datos: OfertaLaboralPersistenciaDTO): Promise<void>

  obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]>

  obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO>
}
