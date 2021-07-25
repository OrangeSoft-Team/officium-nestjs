export interface DireccionPersistenciaDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
  idEstado: string
  idPais: string
}

export interface IRepositorioDirecciones {
  crear(comando: DireccionPersistenciaDTO): Promise<void>

  obtenerPorId(id: string): Promise<DireccionPersistenciaDTO>

  verificarPais(id: string): Promise<boolean>

  verificarEstado(idPais: string, idEstado: string): Promise<boolean>

  verificarCiudad(idEstado: string, idCiudad: string): Promise<boolean>
}
