export interface CrearDireccionPersistenciaDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
}

export interface IRepositorioDirecciones {
  crear(comando: CrearDireccionPersistenciaDTO): Promise<void>
}
