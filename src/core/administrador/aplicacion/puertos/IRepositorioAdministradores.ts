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

export interface IRepositorioAdministradores {
  autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO>
}
