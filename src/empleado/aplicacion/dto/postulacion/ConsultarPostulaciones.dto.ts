import { Identificador } from "../../../../comun/dominio/values/Identificador";
import { NombreEmpresa } from "../../../dominio/values/Empresa/NombreEmpresa";
import { CargoOferta } from "../../../dominio/values/oferta/CargoOferta";
import { TituloOferta } from "../../../dominio/values/oferta/TituloOferta";
import { ComentarioPostulacion } from "../../../dominio/values/postulacion/ComentarioPostulacion";
import { EstadoPostulacion } from "../../../dominio/values/postulacion/EstadoPostulacion";
import { FechaPostulacion } from "../../../dominio/values/postulacion/FechaPostulacion";

export interface ConsultarPostulacionesDTO{
    uuid: string
    uuidOfertaLaboral: string
    tituloOferta: string
    cargoOferta: string
    empresaNombre: string
    comentario: string
}

export interface ConsultarPostulacionesPeticionDTO {
    uuidEmpleado: string
}


export interface DominioPostulacionDTO{
    uuid: Identificador
    uuidOfertaLaboral: Identificador
    tituloOferta: TituloOferta
    cargoOferta: CargoOferta
    empresaNombre: NombreEmpresa
    estado: EstadoPostulacion
    fecha: FechaPostulacion
    comentario: ComentarioPostulacion
}