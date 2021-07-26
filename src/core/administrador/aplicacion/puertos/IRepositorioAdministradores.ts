export interface DatosAutentificacionPersistenciaDTO {
  correoElectronico: string
  token: string
}

export interface InformacionSesionPersistenciaDTO {
  valido: boolean
  primerNombre?: string
  primerApellido?: string
  id?: string
}

export interface AdministradorPersistenciaDTO {
  id: string
  correoElectronico?: string
  primerNombre: string
  primerApellido: string
  cargo: string
  token?: string
}

export interface IRepositorioAdministradores {
  autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO>

  obtenerPorId(id: string): Promise<AdministradorPersistenciaDTO>

  editar(datos: AdministradorPersistenciaDTO): Promise<void>
}
