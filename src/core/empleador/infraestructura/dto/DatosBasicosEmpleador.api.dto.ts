interface HabilidadesDatosBasicosEmpleadorApiDTO {
  uuid: string
  nombre: string
  categoria: string
}

export interface DatosBasicosEmpleadorApiDTO {
  nombreEmpresa: string
  correoElectronico: string
  requisitosEspeciales?: string
  calleUno: string
  calleDos: string
  uuidPais: string
  uuidEstado: string
  uuidCiudad: string
  habilidades: HabilidadesDatosBasicosEmpleadorApiDTO[]
}
