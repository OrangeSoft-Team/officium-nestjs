export interface CrearEmpleadoComandoDTO {
  id: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  telefono: string
  nivelEducativo: string
  estatus: string
  genero: string
  fechaNacimiento: Date
  token: string
  idDireccion: string
}

export interface EmpleadoExisteQueryDTO {
  correoElectronico: string
}

export interface IRepositorioEmpleados {
  crear(comando: CrearEmpleadoComandoDTO): Promise<void>

  existe(query: EmpleadoExisteQueryDTO): Promise<boolean>
}
