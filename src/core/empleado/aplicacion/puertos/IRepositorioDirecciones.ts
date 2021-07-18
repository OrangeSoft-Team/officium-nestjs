export interface CrearDireccionComandoDTO {
  id: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
}

export interface IRepositorioDirecciones {
  crear(comando: CrearDireccionComandoDTO): Promise<void>
}
