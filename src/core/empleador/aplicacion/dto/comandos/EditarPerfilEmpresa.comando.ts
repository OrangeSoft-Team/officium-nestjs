export interface DatosCrearDireccionComandoDTO {
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idPais: string
  idEstado: string
  idCiudad: string
}

export interface EditarPerfilEmpresaComandoDTO
  extends DatosCrearDireccionComandoDTO {
  idEmpresa: string
  nombre: string
  requisitosEspeciales?: string
  idHabilidades: string[]
}
