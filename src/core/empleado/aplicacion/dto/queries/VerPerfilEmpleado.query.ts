export interface VerPerfilEmpleadoQueryDTO {
  id: string
}

export interface VerPerfilEmpleadoRespuestaDTO {
  correo: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  genero: string
  nivelEducativo: string
  numeroTelefonico: string
  fechaNacimiento: Date
  codigoPostal: string
  calleUno: string
  calleDos?: string
  idPais: string
  idEstado: string
  idCiudad: string
}
