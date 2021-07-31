import { Pais } from '../../dominio/entidades/Pais'
import { ObtenerPaisesRespuestaDTO } from '../dto/queries/ObtenerPaises.query'
import { IExcepcionAplicacion } from '../IExcepcionAplicacion'
import { IServicioAplicacion } from '../IServicioAplicacion'
import { UbicacionMapeador } from '../mapeadores/Ubicacion.mapeador'
import { IRepositorioUbicaciones } from '../puertos/IRepositorioUbicaciones'
import { Resultado } from '../Resultado'

export class ServicioObtenerPaises implements IServicioAplicacion {
  public constructor(
    private readonly repositorioUbicaciones: IRepositorioUbicaciones,
  ) {}

  private async restaurarPaises(): Promise<Pais[]> {
    const datosPaises = await this.repositorioUbicaciones.listarPaises()

    return datosPaises?.map((datosPais) =>
      UbicacionMapeador.convertirPaisPersistenciaEnDominio(datosPais),
    )
  }

  public async ejecutar(): Promise<
    Resultado<ObtenerPaisesRespuestaDTO[] | IExcepcionAplicacion>
  > {
    try {
      // Restauramos paises
      const paises = await this.restaurarPaises()

      // Mappeamos
      const respuesta = paises?.map((pais) =>
        UbicacionMapeador.convertirPaisDominioEnRespuesta(pais),
      )

      return Resultado.ok<ObtenerPaisesRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
