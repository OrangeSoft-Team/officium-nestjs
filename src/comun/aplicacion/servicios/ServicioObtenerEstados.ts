import { Estado } from '../../dominio/entidades/Estado'
import {
  ObtenerEstadosQueryDTO,
  ObtenerEstadosRespuestaDTO,
} from '../dto/queries/ObtenerEstados.query'
import { IExcepcionAplicacion } from '../IExcepcionAplicacion'
import { IServicioAplicacion } from '../IServicioAplicacion'
import { UbicacionMapeador } from '../mapeadores/Ubicacion.mapeador'
import { IRepositorioUbicaciones } from '../puertos/IRepositorioUbicaciones'
import { Resultado } from '../Resultado'

export class ServicioObtenerEstados implements IServicioAplicacion {
  public constructor(
    private readonly repositorioUbicaciones: IRepositorioUbicaciones,
  ) {}

  private async restaurarEstados(idPais: string): Promise<Estado[]> {
    const datosEstados =
      await this.repositorioUbicaciones.listarEstadosPorIdPais(idPais)

    return datosEstados?.map((datos) =>
      UbicacionMapeador.convertirEstadoPersistenciaEnDominio(datos),
    )
  }

  public async ejecutar(
    query: ObtenerEstadosQueryDTO,
  ): Promise<Resultado<ObtenerEstadosRespuestaDTO[] | IExcepcionAplicacion>> {
    try {
      // Restauramos estados del pais
      const estados = await this.restaurarEstados(query.idPais)

      // Mappeamos la respuesta
      const respuesta = estados?.map((estado) => {
        return {
          ...UbicacionMapeador.convertirEstadoDominioEnRespuesta(estado),
          idPais: query.idPais,
        }
      })
      return Resultado.ok<ObtenerEstadosRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
