import { DatosRestaurarLeccion, DatosRestaurarListaLecciones } from "../../dominio/servicios/RestaurarLeccion";
import { ContenidoLeccion } from "../../dominio/values/leccion/ContenidoLeccion";
import { DescripcionLeccion } from "../../dominio/values/leccion/DescripcionLeccion";
import { IdentificadorLeccion } from "../../dominio/values/leccion/IdentificadorLeccion";
import { TituloLeccion } from "../../dominio/values/leccion/TituloLeccion";
import { LeccionesRespuestaDTO } from "../dto/queries/ConsultarDetalleCurso.query";
import { VerLeccionRespuestaDTO } from "../dto/queries/VerLeccion.query";
import { LeccionesPersistenciaDTO, LeccionPersistenciaDTO } from "../puertos/IRepositorioLecciones";


export abstract class LeccionMapeador {

    public static ConvertirListaleccionesDominio(
        listalecciones: LeccionesPersistenciaDTO[]
    ):DatosRestaurarListaLecciones[] {
        const lecciones: DatosRestaurarListaLecciones[] = listalecciones?.map((leccion) => {
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
        const lecciones: LeccionesRespuestaDTO[] = leccionesDominio?.map((leccion) => {
            return {
              uuid: leccion.uuid.obtenerId(),
              titulo: leccion.titulo.obtenerTitulo(),
            }
          })
          return lecciones
    }

    public static ConvertirLeccionDominio(
        leccion: LeccionPersistenciaDTO
    ): DatosRestaurarLeccion {
        return {
          uuid: IdentificadorLeccion.crear(leccion.uuid),
          titulo: TituloLeccion.crear(leccion.titulo),
          descripcion: DescripcionLeccion.crear(leccion.descripcion),
          contenido: ContenidoLeccion.crear(leccion.contenido),
        }
    }

    public static ConvertirLeccionRespuesta(
      leccion: DatosRestaurarLeccion
    ): VerLeccionRespuestaDTO{
      return{
        uuid: leccion.uuid.obtenerId(),
        titulo: leccion.titulo.obtenerTitulo(),
        descripcion: leccion.descripcion.obtenerDescripcion(),
        contenido: leccion.contenido.obtenerContenido(),
      }
    }
}