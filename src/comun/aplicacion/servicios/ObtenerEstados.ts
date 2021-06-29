import { Excepcion } from '../../dominio/Excepcion'
import {
  ObtenerEstadosRespuestaDTO,
  ObtenerEstadosSolicitudDTO,
} from '../dto/ObtenerEstados.dto'
import { PaisNoExiste } from '../excepciones/PaisNoExiste'
import { ObtenerEstadosMapeador } from '../mapeadores/ObtenerEstados.mapeador'
import { IRepositorioEstados } from '../puertos/IRepositorioEstados'
import { IRepositorioPaises } from '../puertos/IRepositorioPaises'
import { Resultado } from '../Resultado'

export class ObtenerEstados {
  public constructor(
    private readonly repositorioEstados: IRepositorioEstados,
    private readonly repositorioPaises: IRepositorioPaises,
  ) {}

  public async ejecutar(solicitud: ObtenerEstadosSolicitudDTO) {
    try {
      // Verificamos la existencia del pais
      const paisExiste = await this.repositorioPaises.existe({
        id: solicitud.idPais,
      })
      if (!paisExiste.existe)
        throw new PaisNoExiste(
          solicitud.idPais,
          'El país no se encuentra registrado en el sistema.',
        )

      // Obtenemos los datos de persistencia
      const datos = await this.repositorioEstados.obtenerPorPais({
        id: solicitud.idPais,
      })

      // Mapeamos los datos de persistencia a entidades de dominio
      const estados = await ObtenerEstadosMapeador.persitenciaEntidades(datos)

      // Mapeamos las entidades de dominio a la respuesta de la solicitud
      const respuesta: ObtenerEstadosRespuestaDTO[] =
        ObtenerEstadosMapeador.entidadesRespuesta(estados, solicitud.idPais)

      // En caso de que todo salga bien, retornamos un OK con los datos
      return Resultado.ok<ObtenerEstadosRespuestaDTO[]>(respuesta)
    } catch (error) {
      // En caso de error retornamos una FALLA con la excepcion
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
