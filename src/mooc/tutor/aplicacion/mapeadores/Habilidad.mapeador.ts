import { Habilidad } from '../../dominio/entidades/Habilidad'
import { IdentificadorHabilidad } from "../../dominio/values/habilidad/IdentificadorHabilidad";
import { DatosRestaurarListaHabilidades } from "../../dominio/servicios/RestaurarHabilidad";
import { HabilidadesCursoPersistenciaDTO } from "../puertos/IRepositorioHabilidades";
import { DatosRestaurarHabilidad } from "../../dominio/servicios/RestaurarCurso";
import { HabilidadesRespuestaDTO } from '../puertos/IRepositorioCursos';


export abstract class HabilidadMapeador {

    public static convertirPersistenciaEnDominio(
      datos: HabilidadesCursoPersistenciaDTO,
    ): DatosRestaurarHabilidad {
      return {
        uuidHabilidad: IdentificadorHabilidad.crear(datos.uuidCurso)
      }
    }

    public static ConvertirListaHabilidadesDominio(
        listaHabilidades: HabilidadesRespuestaDTO[]
    ):DatosRestaurarListaHabilidades[] {
        const habilidades: DatosRestaurarListaHabilidades[] = listaHabilidades?.map((habilidad) => {
            return {
              uuid: IdentificadorHabilidad.crear('1'),
            }
          })
          return habilidades
    }
}