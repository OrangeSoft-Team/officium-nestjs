import { Excepcion } from '../../dominio/Excepcion'
import { ObtenerPaisesRespuestaDTO } from '../dto/ObtenerPaises.dto'
import { PaisMapeador } from '../mapeadores/Pais.mapeador'
import { IRepositorioPaises } from '../puertos/IRepositorioPaises'
import { Resultado } from '../Resultado'

export class ObtenerPaises {
  public constructor(private readonly repositorioPaises: IRepositorioPaises) {}

  public async ejecutar() {
    try {
      // Obtenemos los datos de persistencia
      const datos = await this.repositorioPaises.obtenerTodos()

      // Mapeamos los datos de persistencia a entidades de dominio
      const paises = await PaisMapeador.transformarPersistenciaEnEntidades(
        datos,
      )

      // Mapeamos las entidades de dominio a la respuesta de la solicitud
      const respuesta: ObtenerPaisesRespuestaDTO[] =
        PaisMapeador.transformarEntidadesEnRespuesta(paises)

      // En caso de que todo salga bien, retornamos un OK con los datos
      return Resultado.ok<ObtenerPaisesRespuestaDTO[]>(respuesta)
    } catch (error) {
      // En caso de error retornamos una FALLA con la excepcion
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
