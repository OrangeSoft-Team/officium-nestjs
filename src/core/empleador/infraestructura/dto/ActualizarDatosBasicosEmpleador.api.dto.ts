export interface ActualizarDatosBasicosEmpleadorApiDTO {
  nombreEmpresa: string
  correoElectronico: string
  requisitosEspeciales?: string
  calleUno: string
  calleDos: string
  uuidPais: string
  uuidEstado: string
  uuidCiudad: string
  uuidHabilidades: string[]
}
