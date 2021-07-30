export interface VerPerfilEmpleadoQueryDTO {
  idEmpleado: string
}

export interface HabilidadPerfilEmpleadoRespuestaDTO {
  id: string
  nombre: string
  categoria: string
}

export interface ExperienciaLaboralPerfilEmpleadoRespuestaDTO {
  id: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: Date
  fechaFin: Date
}

export interface VerPerfilEmpleadoRespuestaDTO {
  id: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  estatus: string
  genero: string
  fechaNacimiento: Date
  calleUno: string
  calleDos?: string
  codigoPostal: string
  nombrePais: string
  nombreEstado: string
  nombreCiudad: string
  habilidades: HabilidadPerfilEmpleadoRespuestaDTO[]
  experienciasLaborales: ExperienciaLaboralPerfilEmpleadoRespuestaDTO[]
}
