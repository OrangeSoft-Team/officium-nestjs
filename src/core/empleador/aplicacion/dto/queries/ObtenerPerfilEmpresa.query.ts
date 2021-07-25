export interface ObtenerPerfilEmpresaQueryDTO {
  idEmpresa: string
}

export interface HabilidadesPerfilEmpresaRespuestaDTO {
  id: string
  nombre: string
  categoria: string
}
export interface ObtenerPerfilEmpresaRespuestaDTO {
  nombre: string
  correo: string
  requisitosEspeciales: string
  calleUno?: string
  calleDos?: string
  codigoPostal?: string
  idPais?: string
  idEstado?: string
  idCiudad?: string
  habilidades?: HabilidadesPerfilEmpresaRespuestaDTO[]
}
