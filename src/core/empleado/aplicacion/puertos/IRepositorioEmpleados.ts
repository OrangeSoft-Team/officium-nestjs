export interface CrearEmpleadoPersistenciaDTO {
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

export interface EmpleadoExistePersistenciaDTO {
  correoElectronico: string
}

export interface IRepositorioEmpleados {
  crear(comando: CrearEmpleadoPersistenciaDTO): Promise<void>

  existe(query: EmpleadoExistePersistenciaDTO): Promise<boolean>
}
