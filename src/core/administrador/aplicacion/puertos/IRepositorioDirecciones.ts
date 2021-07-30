export interface DireccionPersistenciaDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idPais: string
  nombrePais: string
  idEstado: string
  nombreEstado: string
  idCiudad: string
  nombreCiudad: string
}

export interface IRepositorioDirecciones {
  obtenerPorId(id: string): Promise<DireccionPersistenciaDTO>
}
