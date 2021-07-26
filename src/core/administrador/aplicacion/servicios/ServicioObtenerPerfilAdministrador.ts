import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Administrador } from '../../dominio/entidades/Administrador'
import { AdministradorNoExiste } from '../../dominio/excepciones/administrador/Administrador.excepciones'
import { RestaurarAdministrador } from '../../dominio/servicios/RestaurarAdministrador'
import {
  ObtenerPerfilAdministradorQueryDTO,
  ObtenerPerfilAdministradorRespuestaDTO,
} from '../dto/queries/ObtenerPerfilAdministrador.query'
import { AdministradorMapeador } from '../mapeadores/Administrador.mapeador'
import { IRepositorioAdministradores } from '../puertos/IRepositorioAdministradores'

export class ServicioObtenerPerfilAdministrador implements IServicioAplicacion {
  public constructor(
    private readonly repositorioAdministradores: IRepositorioAdministradores,
  ) {}

  private async restaurarAdministrador(id: string): Promise<Administrador> {
    const datosAdministrador =
      await this.repositorioAdministradores.obtenerPorId(id)
    if (!datosAdministrador)
      throw new AdministradorNoExiste(
        'El administrador no se encuentra registrado.',
      )

    return RestaurarAdministrador.restaurar(
      AdministradorMapeador.convertirPersistenciaEnDominio(datosAdministrador),
    )
  }

  public async ejecutar(
    query: ObtenerPerfilAdministradorQueryDTO,
  ): Promise<
    Resultado<ObtenerPerfilAdministradorRespuestaDTO | IExcepcionAplicacion>
  > {
    try {
      // Restauramos al administrador de persistencia
      const administrador = await this.restaurarAdministrador(
        query.idAdministrador,
      )

      // Obtenemos el perfil de la empresa
      const datosPerfil =
        AdministradorMapeador.convertirDominioEnRespuesta(administrador)

      // Retornamos ok con los datos
      return Resultado.ok<ObtenerPerfilAdministradorRespuestaDTO>(datosPerfil)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
