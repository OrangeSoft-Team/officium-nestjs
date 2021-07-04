import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'

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

export interface ConsultarOfertaLaboralAdministradorPersistenciaDTO {
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

export interface VerDetallesOfertaLaboralAdministradorPersistenciaDTO {
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
  uuidEmpresa: string
  nombreEmpresa: string
  calleEmpresa: string
  codigoPostalEmpresa: string
  ciudadEmpresa: string
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

  listar(): Promise<ConsultarOfertaLaboralAdministradorPersistenciaDTO[]>

  obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]>

  obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO>

  buscarOferta(
    peticion: IdentificadorDTO,
  ): Promise<VerDetallesOfertaLaboralAdministradorPersistenciaDTO>

  existe(dto: IdentificadorOfertaLaboralDTO): Promise<OfertaLaboralExisteDTO>
}
