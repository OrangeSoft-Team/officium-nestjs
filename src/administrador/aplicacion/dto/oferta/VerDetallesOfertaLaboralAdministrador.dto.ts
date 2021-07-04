import { CalleDireccion } from '../../../../comun/dominio/values/CalleDireccion'
import { CodigoPostalDireccion } from '../../../../comun/dominio/values/CodigoPostalDireccion'
import { Identificador } from '../../../../comun/dominio/values/Identificador'
import { NombreCiudad } from '../../../../comun/dominio/values/NombreCiudad'
import { NombreEmpresa } from '../../../dominio/values/empresa/NombreEmpresa'

export interface VerDetallesOfertaLaboralAdministradorDTO {
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

export interface VerDetallesOfertaLaboralAdministradorPeticionDTO {
  idOferta: string
}

export interface DominioDetallesOfertaLaboralAdministradorDTO {
  uuidEmpresa: Identificador
  nombreEmpresa: NombreEmpresa
  calleEmpresa: CalleDireccion
  codigoPostalEmpresa: CodigoPostalDireccion
  ciudadEmpresa: NombreCiudad
}