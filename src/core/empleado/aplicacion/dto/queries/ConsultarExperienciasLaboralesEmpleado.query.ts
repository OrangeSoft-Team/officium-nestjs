export interface ConsultarExperienciasLaboralesEmpleadoQueryDTO {
  idEmpleado: string
}

export interface ConsultarExperienciasLaboralesEmpleadoRespuestaDTO {
  id: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: Date
  fechaFin: Date
}
