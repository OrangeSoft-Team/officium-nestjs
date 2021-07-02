import { IdentificadorDTO } from "../../../comun/aplicacion/dto/Identificador.dto";
import { ConsultarPostulacionesDTO, ConsultarPostulacionesPeticionDTO } from "../dto/postulacion/ConsultarPostulaciones.dto";

export interface PostulacionOfertaPersistenciaDTO {
  id: string
  idOferta: string
  idEmpleado: string
  fecha: Date
  estado: string
  comentario?: string
}

export interface ConsultarPostulacionesPersistenciaDTO {
  uuid: string
  uuidOfertaLaboral: string
  tituloOferta: string
  cargoOferta: string
  nombreEmpresa: string
  estado: string
  fecha: Date
  comentario?: string
}

export interface IRepositorioPostulaciones {
  crear(postulacion: PostulacionOfertaPersistenciaDTO): Promise<void>
  consultar(peticion: IdentificadorDTO): Promise<ConsultarPostulacionesPersistenciaDTO[]>

}
