import { CalleDireccion } from "src/comun/dominio/values/CalleDireccion";
import { CodigoPostalDireccion } from "src/comun/dominio/values/CodigoPostalDireccion";
import { NombreCiudad } from "src/comun/dominio/values/NombreCiudad";
import { NombreEmpresa } from "src/empleado/dominio/values/Empresa/NombreEmpresa";

export interface VerDetallesOfertaLaboralDTO {
    id: string
    titulo: string
    fecha: Date
    cargo: string
    sueldo: number
    descripcion: string
    duracionEstimadaValor: number
    duracionEstimadaEscala: string
    turnoTrabajo: string
    numeroVacantes: number
    nombreEmpresa: string
    direccionEmpresa: string
  }

  export interface VerDetallesOfertaLaboralPeticionDTO {
    idOferta: string
  }

  export interface DominioDetallesOfertaLaboralDTO {
    nombreEmpresa: NombreEmpresa
    calleEmpresa: CalleDireccion
    codigoPostalEmpresa: CodigoPostalDireccion
    ciudadEmpresa: NombreCiudad 
  }