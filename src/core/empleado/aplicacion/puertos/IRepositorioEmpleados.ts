export interface EmpleadoPersistenciaDTO {
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
  idDireccion: string
  token?: string
}

export interface EmpleadoExistePersistenciaDTO {
  correoElectronico: string
}

export interface DatosAutentificacionPersistenciaDTO {
  correoElectronico: string
  token: string
}

export interface InformacionSesionPersistenciaDTO {
  valido: boolean
  primerNombre?: string
  primerApellido?: string
  id?: string
}

export interface IRepositorioEmpleados {
  crear(comando: EmpleadoPersistenciaDTO): Promise<void>

  existe(query: EmpleadoExistePersistenciaDTO): Promise<boolean>

  autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO>

  obtener(id: string): Promise<EmpleadoPersistenciaDTO>
}
