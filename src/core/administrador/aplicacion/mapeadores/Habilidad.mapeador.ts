import { Habilidad } from '../../dominio/entidades/Habilidad'
import { DatosRestaurarHabilidad } from '../../dominio/servicios/RestaurarEmpleado'
import { CategoriaHabilidad } from '../../dominio/values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../../dominio/values/habilidad/NombreHabilidad'
import { HabilidadPerfilEmpleadoRespuestaDTO } from '../dto/queries/VerPerfilEmpleado.query'
import { HabilidadPersistenciaDTO } from '../puertos/IRepositorioHabilidades'

export abstract class HabilidadMapeador {
  public static convertirPersistenciaEnDominio(
    datos: HabilidadPersistenciaDTO,
  ): DatosRestaurarHabilidad {
    return {
      identificador: IdentificadorHabilidad.crear(datos.id),
      categoria: CategoriaHabilidad.crear(datos.categoria),
      nombre: NombreHabilidad.crear(datos.nombre),
    }
  }

  public static convertirDominioEnRespuesta(
    habilidad: Habilidad,
  ): HabilidadPerfilEmpleadoRespuestaDTO {
    return {
      id: habilidad.obtenerIdentificador(),
      nombre: habilidad.obtenerNombre(),
      categoria: habilidad.obtenerCategoria(),
    }
  }
}
