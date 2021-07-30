export interface ListarEmpleadosRespuestaDTO {
  id: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  genero: string
  estatus: string
}
