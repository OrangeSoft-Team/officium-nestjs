export interface DatosAutentificacionPersistenciaDTO {
  correoElectronico: string
  token: string
}

export interface InformacionSesionPersistenciaDTO {
  valido: boolean
  nombreEmpresa?: string
  id?: string
}

export interface IRepositorioEmpresas {
  autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO>
}
