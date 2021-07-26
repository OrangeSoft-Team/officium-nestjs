export interface DatosAutentificacionPersistenciaDTO {
  correoElectronico: string
  token: string
}

export interface InformacionSesionPersistenciaDTO {
  valido: boolean
  nombreEmpresa?: string
  id?: string
}

export interface EmpresaPersistenciaDTO {
  id: string
  nombreEmpresa: string
  correoElectronico: string
  estatus: string
  idDireccion: string
  requisitosEspeciales?: string
  token?: string
}

export interface DatosBasicosEmpresaPersistenciaDTO {
  id: string
  nombreEmpresa: string
  requisitosEspeciales?: string
}

export interface IRepositorioEmpresas {
  autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO>

  obtener(id: string): Promise<EmpresaPersistenciaDTO>

  actualizarDatos(
    datosBasicos: DatosBasicosEmpresaPersistenciaDTO,
  ): Promise<void>
}
