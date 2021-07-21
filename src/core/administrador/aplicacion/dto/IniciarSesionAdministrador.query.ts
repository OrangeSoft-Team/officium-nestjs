export interface IniciarSesionAdministradorQueryDTO {
  correoElectronico: string
  token: string
}

export interface IniciarSesionAdministradorRespuestaDTO {
  valido: boolean
  primerNombre?: string
  primerApellido?: string
  id?: string
}
