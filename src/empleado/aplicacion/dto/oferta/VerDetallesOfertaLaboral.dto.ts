import { CalleDireccion } from '../../../../comun/dominio/values/CalleDireccion'
import { CodigoPostalDireccion } from '../../../../comun/dominio/values/CodigoPostalDireccion'
import { Identificador } from '../../../../comun/dominio/values/Identificador'
import { NombreCiudad } from '../../../../comun/dominio/values/NombreCiudad'
import { NombreEmpresa } from '../../../dominio/values/Empresa/NombreEmpresa'

export interface VerDetallesOfertaLaboralDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  fechaModificacion: Date
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimadaValor: number
  duracionEstimadaEscala: string
  turnoTrabajo: string
  numeroVacantes: number
  uuidEmpresa: string
  nombreEmpresa: string
  direccionEmpresa: string
}

export interface VerDetallesOfertaLaboralPeticionDTO {
  idOferta: string
}

export interface DominioDetallesOfertaLaboralDTO {
  uuidEmpresa: Identificador
  nombreEmpresa: NombreEmpresa
  calleEmpresa: CalleDireccion
  codigoPostalEmpresa: CodigoPostalDireccion
  ciudadEmpresa: NombreCiudad
}
