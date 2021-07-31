import {
  ObtenerCiudadesQueryDTO,
  ObtenerCiudadesRespuestaDTO,
} from '../dto/queries/ObtenerCiudades.query'
import { IExcepcionAplicacion } from '../IExcepcionAplicacion'
import { IServicioAplicacion } from '../IServicioAplicacion'
import { UbicacionMapeador } from '../mapeadores/Ubicacion.mapeador'
import { IRepositorioUbicaciones } from '../puertos/IRepositorioUbicaciones'
import { Resultado } from '../Resultado'

export class ServicioObtenerCiudades implements IServicioAplicacion {
  public constructor(
    private readonly repositorioUbicaciones: IRepositorioUbicaciones,
  ) {}

  private async restaurarCiudades(idEstado: string) {
    const datosCiudades =
      await this.repositorioUbicaciones.listarCiudadesPorIdEstado(idEstado)

    return datosCiudades?.map((ciudad) =>
      UbicacionMapeador.convertirCiudadPersistenciaEnDominio(ciudad),
    )
  }

  public async ejecutar(
    query: ObtenerCiudadesQueryDTO,
  ): Promise<Resultado<ObtenerCiudadesRespuestaDTO[] | IExcepcionAplicacion>> {
    try {
      // Restauramos ciudades
      const ciudades = await this.restaurarCiudades(query.idEstado)

      // Mappeamos
      const resultado = ciudades?.map((ciudad) => {
        return {
          ...UbicacionMapeador.convertirCiudadDominioEnRespuesta(ciudad),
          idEstado: query.idEstado,
          idPais: query.idPais,
        }
      })
      return Resultado.ok<ObtenerCiudadesRespuestaDTO[]>(resultado)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
