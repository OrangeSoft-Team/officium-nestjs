import { IdentificadorHabilidad } from "../../dominio/values/habilidad/IdentificadorHabilidad";
import { CategoriaHabilidad } from "../../dominio/values/habilidad/CategoriaHabilidad";
import { NombreHabilidad } from "../../dominio/values/habilidad/NombreHabilidad";

export interface DatosRestaurarListaHabilidades {
    uuid: IdentificadorHabilidad
    nombre: NombreHabilidad
    categoria: CategoriaHabilidad
}