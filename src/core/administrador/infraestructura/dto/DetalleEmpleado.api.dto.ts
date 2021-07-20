interface HabilidadesDetalleEmpleadoApiDTO {
  uuid: string
  nombre: string
  categoria: string
}

interface ExperienciasDetalleEmpleadoApiDTO {
  uuid: string
  cargo: string
  nombreEmpresa: string
  fechaInicio: string
  fechaFin: string
}

interface ReferenciasDetalleEmpleadoApiDTO {
  uuid: string
  primerNombre: string
  primerApellido: string
  segundoNombre: string
  segundoApellido: string
  cargo: string
  nombreEmpresa: string
  telefono: string
  correoElectronico: string
}

export interface DetalleEmpleadoApiDTO {
  uuid: string
  nombre: string
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
  habilidades: HabilidadesDetalleEmpleadoApiDTO[]
  referencias: ReferenciasDetalleEmpleadoApiDTO[]
  experienciasLaborales: ExperienciasDetalleEmpleadoApiDTO[]
}
