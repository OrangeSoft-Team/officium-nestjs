import { VerLeccionRespuestaDTO } from "../../aplicacion/dto/queries/VerLeccion.query";
import { LeccionCursoApiDTO } from "../dto/LeccionCurso.api.dto";

export abstract class LeccionApiMapeador {
    public static ConvertirRespuestaVerLeccion(
       leccion: VerLeccionRespuestaDTO
    ): LeccionCursoApiDTO{
        return{
        uuid: leccion.uuid,
        titulo: leccion.titulo,
        descripcion: leccion.descripcion,
        contenido: leccion.contenido,
        }
    }
}