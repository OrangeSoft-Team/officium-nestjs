export interface ExperienciaLaboralPersitenciaDTO {
  id: string
  idEmpleado?: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: Date
  fechaFin: Date
}

export interface IRepositorioExperienciasLaborales {
  obtenerPorIdEmpleado(
    idEmpleado: string,
  ): Promise<ExperienciaLaboralPersitenciaDTO[]>

  crear(datos: ExperienciaLaboralPersitenciaDTO): Promise<void>
}
