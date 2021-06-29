import { Excepcion } from '../../dominio/Excepcion'
import {
  ObtenerCiudadesSolicitudDTO,
  ObtenerCiudadesRespuestaDTO,
} from '../dto/ObtenerCiudades.dto'
import { EstadoNoExiste } from '../excepciones/EstadoNoExiste'
import { PaisNoExiste } from '../excepciones/PaisNoExiste'
import { ObtenerCiudadesMapeador } from '../mapeadores/ObtenerCiudades.mapeador'
import { ObtenerEstadosMapeador } from '../mapeadores/ObtenerEstados.mapeador'
import { IRepositorioCiudades } from '../puertos/IRepositorioCiudades'
import { IRepositorioEstados } from '../puertos/IRepositorioEstados'
import { IRepositorioPaises } from '../puertos/IRepositorioPaises'
import { Resultado } from '../Resultado'

export class ObtenerCiudades {
  public constructor(
    private readonly repositorioCiudades: IRepositorioCiudades,
    private readonly repositorioEstados: IRepositorioEstados,
    private readonly repositorioPaises: IRepositorioPaises,
  ) {}

  public async ejecutar(solicitud: ObtenerCiudadesSolicitudDTO) {
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

      // Obtenemos los estados del pais de persistencia
      const datosEstados = await this.repositorioEstados.obtenerPorPais({
        id: solicitud.idPais,
      })

      // Mapeamos los estados de persistencia a entidades de dominio
      const estados = await ObtenerEstadosMapeador.persitenciaEntidades(
        datosEstados,
      )

      // Verificamos si existe el estado con el id de la solicitud para el pais
      if (
        !estados.some(
          (estado) =>
            estado.obtenerIdentificador().obtenerId() == solicitud.idEstado,
        )
      )
        throw new EstadoNoExiste(
          solicitud.idEstado,
          'El país no posee registrado el estado colocado.',
        )

      // Obtenemos las ciudades de la persistencia de datos
      const datosCiudades = await this.repositorioCiudades.obtenerPorEstado({
        id: solicitud.idEstado,
      })

      // Mapeamos los datos de persistencia a entidades de dominio
      const ciudades = await ObtenerCiudadesMapeador.persitenciaEntidades(
        datosCiudades,
      )

      // Mapeamos las entidades de dominio a la respuesta de la solicitud
      const respuesta: ObtenerCiudadesRespuestaDTO[] =
        ObtenerCiudadesMapeador.entidadesRespuesta(
          ciudades,
          solicitud.idPais,
          solicitud.idEstado,
        )
      // En caso de que todo salga bien, retornamos un OK con los datos
      return Resultado.ok<ObtenerCiudadesRespuestaDTO[]>(respuesta)
    } catch (error) {
      // En caso de error retornamos una FALLA con la excepcion
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
