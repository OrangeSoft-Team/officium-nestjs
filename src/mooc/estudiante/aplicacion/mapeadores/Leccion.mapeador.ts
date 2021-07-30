import { DatosRestaurarListaLecciones } from "../../dominio/servicios/RestaurarLeccion";
import { IdentificadorLeccion } from "../../dominio/values/leccion/Identificadorleccion";
import { TituloLeccion } from "../../dominio/values/leccion/TituloLeccion";
import { LeccionesRespuestaDTO } from "../dto/queries/ConsultarDetalleCurso.query";
import { LeccionesPersistenciaDTO } from "../puertos/IRepositorioLecciones";


export abstract class LeccionMapeador {

    public static ConvertirListaleccionesDominio(
        listalecciones: LeccionesPersistenciaDTO[]
    ):DatosRestaurarListaLecciones[] {
        const lecciones: DatosRestaurarListaLecciones[] = listalecciones.map((leccion) => {
            return {
              uuid: IdentificadorLeccion.crear(leccion.uuid),
              titulo: TituloLeccion.crear(leccion.titulo)
            }
          })
          return lecciones
    }

    public static ConvertirListaLeccionesRespuesta(
        leccionesDominio: DatosRestaurarListaLecciones[]
    ): LeccionesRespuestaDTO[] {
        const lecciones: LeccionesRespuestaDTO[] = leccionesDominio.map((leccion) => {
            return {
              uuid: leccion.uuid.obtenerId(),
              titulo: leccion.titulo.obtenerTitulo(),
            }
          })
          return lecciones
    }
}