import { Curso } from '../../dominio/entidades/Curso'
import { DatosCrearCurso } from '../../dominio/servicios/CrearCurso'
import { CursoPersistenciaDTO, HabilidadesRespuestaDTO} from '../puertos/IRepositorioCursos'
import { IdentificadorCurso } from '../../dominio/values/curso/IdentificadorCurso'
import { TituloCurso } from '../../dominio/values/curso/TituloCurso';
import { EstatusCurso } from '../../dominio/values/curso/EstatusCurso';
import { DuracionEstimadaCurso } from '../../dominio/values/curso/DuracionEstimadaCurso'
import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad'
import { DatosRestaurarCurso } from '../../dominio/servicios/RestaurarCurso'
import { CrearCursoComandoDTO } from '../dto/comandos/CrearCurso.comando'
import { Habilidad } from '../../dominio/entidades/Habilidad'
import { FechaCreacionCurso } from '../../dominio/values/curso/FechaCreacionCurso';
import { HabilidadesCursoPersistenciaDTO } from '../puertos/IRepositorioHabilidades';


export abstract class CursoMapeador {

  /* public static convertirPersistenciaEnDominio(
    datos: CursoPersistenciaDTO,
  ): DatosRestaurarCurso {
    return {
      identificador: IdentificadorCurso.crear(datos.uuid),
      nombre: TituloCurso.crear(datos.titulo),
      duracionEstimada: DuracionEstimadaCurso.crear(
        datos.escalaDuracion, 
        datos.valorDuracion),
      uuidHabilidades:  datos.habilidad?.map((habilidad)=>{
        return{
          uuidHabilidad: IdentificadorHabilidad.crear(habilidad.uuidHabilidad)
        }
        })
    }
  } */

  public static convertirDominioEnPersistencia(
    curso: Curso
  ): CursoPersistenciaDTO {
    return {
      uuid: curso.obtenerIdentificador().obtenerId(),
      titulo: curso.obtenerTitulo().obtenerTitulo(),
      valorDuracion: curso.obtenerDuracionEstimada().ObtenerDuracionEstimadaValor(),
      escalaDuracion: curso.obtenerDuracionEstimada().ObtenerDuracionEstimadaEscala(),
      habilidad: curso.obtenerHabilidades()
    }
  }

  public static convertirComandoCrearCurso(
    id: string,
    datos: CrearCursoComandoDTO,
  ): DatosCrearCurso {
    return {
      identificador: IdentificadorCurso.crear(id),
      titulo: TituloCurso.crear(datos.titulo),
      duracionEstimada: DuracionEstimadaCurso.crear(
        datos.escalaDuracion, 
        datos.valorDuracion),
      estatus: EstatusCurso.crear('ACTIVO'),
      fechaCreacion: FechaCreacionCurso.crear( new Date()),
      uuidHabilidades: datos.uuidHabilidades?.map((habilidad)=>{
        return{
          uuidHabilidad: IdentificadorHabilidad.crear(habilidad.idHabilidad)
        }
        })
    }
  }
}
