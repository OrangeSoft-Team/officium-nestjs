import { ContenidoLeccion } from "../values/leccion/ContenidoLeccion";
import { DescripcionLeccion } from "../values/leccion/DescripcionLeccion";
import { IdentificadorLeccion } from "../values/leccion/IdentificadorLeccion";
import { TituloLeccion } from "../values/leccion/TituloLeccion";

export interface DatosRestaurarListaLecciones {
    uuid: IdentificadorLeccion
    titulo: TituloLeccion
}

export interface DatosRestaurarLeccion {
    uuid: IdentificadorLeccion
    titulo: TituloLeccion
    descripcion: DescripcionLeccion
    contenido: ContenidoLeccion
}