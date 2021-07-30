export interface EmpleadoPersistenciaDTO {
  id: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  estatus: string
  genero: string
  fechaNacimiento: Date
  idDireccion?: string
}

export interface IRepositorioEmpleados {
  obtenerPorId(id: string): Promise<EmpleadoPersistenciaDTO>

  obtenerTodos(): Promise<EmpleadoPersistenciaDTO[]>
}
