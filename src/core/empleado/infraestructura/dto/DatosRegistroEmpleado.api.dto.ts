// USM 1.1
// USM 1.2
// USM 2.1
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
