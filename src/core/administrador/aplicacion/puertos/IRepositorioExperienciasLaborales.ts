export interface ExperienciaLaboralPersistenciaDTO {
  id: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: Date
  fechaFin: Date
}

export interface IRepositorioExperienciasLaborales {
  obtenerPorIdEmpleado(id: string): Promise<ExperienciaLaboralPersistenciaDTO[]>
}
