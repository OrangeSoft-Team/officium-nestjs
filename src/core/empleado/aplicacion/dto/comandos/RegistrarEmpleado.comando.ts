export interface RegistrarDireccionComandoDTO {
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
  idEstado: string
  idPais: string
}

export interface RegistrarEmpleadoComandoDTO {
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  telefono: string
  nivelEducativo: string
  genero: string
  fechaNacimiento: Date
  token: string
  direccion: RegistrarDireccionComandoDTO
}
