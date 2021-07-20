export interface DatosRegistroEmpleadoApiDTO {
  correoElectronico: string
  token: string
  primerNombre: string
  segundoNombre?: string
  primerApellido: string
  segundoApellido?: string
  genero: string
  nivelEducativo: string
  numeroTelefonico: string
  fechaNacimiento: string
  codigoPostal: string
  calleUno: string
  calleDos?: string
  uuidPais: string
  uuidEstado: string
  uuidCiudad: string
}
