import { Habilidad } from '../../dominio/entidades/Habilidad'
import { DatosRestaurarHabilidad } from '../../dominio/servicios/RestaurarEmpresa'
import { CategoriaHabilidad } from '../../dominio/values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../../dominio/values/habilidad/NombreHabilidad'
import { HabilidadesPerfilEmpresaRespuestaDTO } from '../dto/queries/ObtenerPerfilEmpresa.query'
import { HabilidadPersistenciaDTO } from '../puertos/IRepositorioHabilidades'

export abstract class HabilidadMapeador {
  public static convertirPersistenciaEnDominio(
    datos: HabilidadPersistenciaDTO[],
  ): DatosRestaurarHabilidad[] {
    const map = datos.map((habilidad) => {
      return {
        identificador: IdentificadorHabilidad.crear(habilidad.id),
        nombre: NombreHabilidad.crear(habilidad.nombre),
        categoria: CategoriaHabilidad.crear(habilidad.nombre),
      }
    })

    return map
  }

  public static convertirDominioEnRespuesta(
    habilidades: Habilidad[],
  ): HabilidadesPerfilEmpresaRespuestaDTO[] {
    return habilidades.map((habilidad) => {
      return {
        id: habilidad.obtenerIdentificador(),
        nombre: habilidad.obtenerNombre(),
        categoria: habilidad.obtenerCategoria(),
      }
    })
  }

  public static convertirDominioEnPersistencia(
    habilidades: Habilidad[],
  ): HabilidadPersistenciaDTO[] {
    return habilidades.map((habilidad) => {
      return {
        id: habilidad.obtenerIdentificador(),
        nombre: habilidad.obtenerNombre(),
        categoria: habilidad.obtenerCategoria(),
      }
    })
  }
}
