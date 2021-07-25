export interface IniciarSesionEmpresaQueryDTO {
  correoElectronico: string
  token: string
}

export interface IniciarSesionEmpresaRespuestaDTO {
  valido: boolean
  nombreEmpresa?: string
  id?: string
}
