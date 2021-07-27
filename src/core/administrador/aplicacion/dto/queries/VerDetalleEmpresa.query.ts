export interface VerDetalleEmpresaQueryDTO {
  id: string
}

export interface VerDetalleEmpresaRespuestaDTO {
  id: string
  nombre: string
  correoElectronico: string
  estatus: string
  requisitosEspeciales?: string
}
