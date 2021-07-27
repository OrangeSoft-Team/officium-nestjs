export interface EmpresaPersistenciaDTO {
  id: string
  nombre: string
  correoElectronico: string
  estatus: string
  requisitosEspeciales?: string
  token?: string
}

export interface IRepositorioEmpresas {
  obtenerTodas(): Promise<EmpresaPersistenciaDTO[]>
  obtenerPorId(id: string): Promise<EmpresaPersistenciaDTO>
  crear(datos: EmpresaPersistenciaDTO): Promise<void>
  existe(correo: string): Promise<boolean>
}
