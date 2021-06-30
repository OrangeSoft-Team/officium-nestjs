import { IdentificadorDTO } from "src/comun/aplicacion/dto/Identificador.dto";

export interface ConsultarOfertaLaboralPersistenciaDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  fechaModificacion?: Date
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimada: number
  escalaDuracion: string
  turno: string
  numeroVacantes: number
  estado: string
  nombreEmpresa: string
}


export interface VerDetallesOfertaLaboralPersistenciaDTO {
  id: string
  titulo: string
  fechaPublicacion: Date
  fechaModificacion?: Date
  cargo: string
  sueldo: number
  descripcion: string
  duracionEstimada: number
  escalaDuracion: string
  turno: string
  numeroVacantes: number
  estado: string
  nombreEmpresa: string
  calleEmpresa: string
  codigoPostalEmpresa: string
  ciudadEmpresa: string
}


export interface IRepositorioOfertaLaboral {
  listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]>
  buscarOferta(peticion: IdentificadorDTO): Promise<VerDetallesOfertaLaboralPersistenciaDTO>

}
