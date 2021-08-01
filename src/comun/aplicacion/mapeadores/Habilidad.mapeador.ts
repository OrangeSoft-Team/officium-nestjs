import { Habilidad } from '../../dominio/entidades/Habilidad'
import { CategoriaHabilidad } from '../../dominio/values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../../dominio/values/habilidad/NombreHabilidad'
import { ObtenerHabilidadesRespuestaDTO } from '../dto/queries/ObtenerHabilidades.query'
import { HabilidadPersistenciaDTO } from '../puertos/IRepositorioHabilidades'

export abstract class HabilidadMapeador {
  public static convertirPersistenciaEnDominio(
    datos: HabilidadPersistenciaDTO,
  ): Habilidad {
    return Habilidad.restaurar({
      identificador: IdentificadorHabilidad.crear(datos.id),
      nombre: NombreHabilidad.crear(datos.nombre),
      categoria: CategoriaHabilidad.crear(datos.categoria),
    })
  }

  public static convertirDominioEnRespuesta(
    habilidad: Habilidad,
  ): ObtenerHabilidadesRespuestaDTO {
    return {
      id: habilidad.obtenerIdentificador(),
      nombre: habilidad.obtenerNombre(),
      categoria: habilidad.obtenerCategoria(),
    }
  }
}
