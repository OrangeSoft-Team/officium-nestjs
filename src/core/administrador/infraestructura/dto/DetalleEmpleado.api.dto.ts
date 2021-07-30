export interface HabilidadDetalleEmpleadoApiDTO {
  uuid: string
  nombre: string
  categoria: string
}

export interface ExperienciaDetalleEmpleadoApiDTO {
  uuid: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: string
  fechaFin: string
}

export interface DetalleEmpleadoApiDTO {
  uuid: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correo: string
  estatus: string
  genero: string
  fechaNacimiento: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  nombrePais: string
  nombreEstado: string
  nombreCiudad: string
  habilidades: HabilidadDetalleEmpleadoApiDTO[]
  experienciasLaborales: ExperienciaDetalleEmpleadoApiDTO[]
}
