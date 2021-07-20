export interface IniciarSesionEmpleadoQueryDTO {
  correoElectronico: string
  token: string
}

export interface IniciarSesionEmpleadoRespuestaDTO {
  valido: boolean
  id?: string
}
