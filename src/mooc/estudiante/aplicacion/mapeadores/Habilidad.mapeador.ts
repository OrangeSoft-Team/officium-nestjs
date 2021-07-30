import { IdentificadorHabilidad } from "../../dominio/values/habilidad/IdentificadorHabilidad";
import { CategoriaHabilidad } from "../../dominio/values/habilidad/CategoriaHabilidad";
import { NombreHabilidad } from "../../dominio/values/habilidad/NombreHabilidad";
import { DatosRestaurarListaHabilidades } from "../../dominio/servicios/RestaurarHabilidad";
import { HabilidadesPersistenciaDTO } from "../puertos/IRepositorioHabilidades";
import { HabilidadesRespuestaDTO } from "../dto/queries/ConsultarDetalleCurso.query";

export abstract class HabilidadMapeador {

    public static ConvertirListaHabilidadesDominio(
        listaHabilidades: HabilidadesPersistenciaDTO[]
    ):DatosRestaurarListaHabilidades[] {
        const habilidades: DatosRestaurarListaHabilidades[] = listaHabilidades.map((habilidad) => {
            return {
              uuid: IdentificadorHabilidad.crear(habilidad.uuid),
              nombre: NombreHabilidad.crear(habilidad.nombre),
              categoria: CategoriaHabilidad.crear(habilidad.categoria),
            }
          })
          return habilidades
    }

    public static ConvertirListaHabilidadesRespuesta(
        habilidadesDominio: DatosRestaurarListaHabilidades[]
    ): HabilidadesRespuestaDTO[] {
        const habilidades: HabilidadesRespuestaDTO[] = habilidadesDominio.map((habilidad) => {
            return {
              uuid: habilidad.uuid.obtenerId(),
              nombre: habilidad.nombre.obtenerNombreHabilidad(),
              categoria: habilidad.categoria.obtenerCategoriaHabilidad(),
            }
          })
          return habilidades
    }
}