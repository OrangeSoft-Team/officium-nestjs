import { Habilidad } from '../../dominio/entidades/Habilidad'
import { ObtenerHabilidadesRespuestaDTO } from '../dto/queries/ObtenerHabilidades.query'
import { IExcepcionAplicacion } from '../IExcepcionAplicacion'
import { IServicioAplicacion } from '../IServicioAplicacion'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'
import { Resultado } from '../Resultado'

export class ServicioObtenerHabilidades implements IServicioAplicacion {
  public constructor(
    private readonly repositorioHabilidades: IRepositorioHabilidades,
  ) {}

  private async restaurarHabilidades(): Promise<Habilidad[]> {
    const datosHabilidades = await this.repositorioHabilidades.listar()

    return datosHabilidades?.map((hab) =>
      HabilidadMapeador.convertirPersistenciaEnDominio(hab),
    )
  }

  public async ejecutar(): Promise<
    Resultado<ObtenerHabilidadesRespuestaDTO[] | IExcepcionAplicacion>
  > {
    try {
      // Restaurar habilidades
      const habilidades = await this.restaurarHabilidades()

      // Mappeamos
      const respuesta = habilidades?.map((hab) =>
        HabilidadMapeador.convertirDominioEnRespuesta(hab),
      )

      return Resultado.ok<ObtenerHabilidadesRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
