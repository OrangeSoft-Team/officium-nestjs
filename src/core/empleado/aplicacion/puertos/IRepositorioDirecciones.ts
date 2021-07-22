export interface DireccionPersistenciaDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
}

export interface IRepositorioDirecciones {
  crear(comando: DireccionPersistenciaDTO): Promise<void>
}
