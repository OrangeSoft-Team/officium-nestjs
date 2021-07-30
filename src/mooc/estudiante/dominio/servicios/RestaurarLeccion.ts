import { IdentificadorLeccion } from "../values/leccion/IdentificadorLeccion";
import { TituloLeccion } from "../values/leccion/TituloLeccion";

export interface DatosRestaurarListaLecciones {
    uuid: IdentificadorLeccion
    titulo: TituloLeccion
}