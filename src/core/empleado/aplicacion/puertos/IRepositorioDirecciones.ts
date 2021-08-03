export interface DireccionPersistenciaDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
  idEstado?: string
  idPais?: string
}

export interface IRepositorioDirecciones {
  crear(comando: DireccionPersistenciaDTO): Promise<void>
  obtener(id: string): Promise<DireccionPersistenciaDTO>
}
