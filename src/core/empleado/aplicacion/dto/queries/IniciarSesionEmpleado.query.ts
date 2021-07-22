export interface IniciarSesionEmpleadoQueryDTO {
  correoElectronico: string
  token: string
}

export interface IniciarSesionEmpleadoRespuestaDTO {
  valido: boolean
  primerNombre?: string
  primerApellido?: string
  id?: string
}
