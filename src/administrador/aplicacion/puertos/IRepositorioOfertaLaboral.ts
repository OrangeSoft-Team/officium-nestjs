
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

export interface ConsultarOfertaLaboralPersistenciaDTO {
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

export interface IdentificadorEmpresaDTO {
  idEmpresa: string
}

export interface IdentificadorOfertaLaboralDTO {
  idOfertaLaboral: string
  idEmpresa: string
}

export interface OfertaLaboralExisteDTO {
  existe: boolean
}

export interface IdentificadorOfertaLaboralDTO {
  idOferta: string
}

export interface IRepositorioOfertaLaboral {
  crear(datos: OfertaLaboralPersistenciaDTO): Promise<void>

  listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]>

  obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]>

  obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO>

  existe(dto: IdentificadorOfertaLaboralDTO): Promise<OfertaLaboralExisteDTO>
}
