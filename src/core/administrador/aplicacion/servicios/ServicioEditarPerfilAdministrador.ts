import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Administrador } from '../../dominio/entidades/Administrador'
import { AdministradorNoExiste } from '../../dominio/excepciones/administrador/Administrador.excepciones'
import { EditarPerfilAdministrador } from '../../dominio/servicios/EditarPerfilAdministrador'
import { RestaurarAdministrador } from '../../dominio/servicios/RestaurarAdministrador'
import { EditarPerfilAdministradorComandoDTO } from '../dto/comandos/EditarPerfilAdministrador.comando'
import { AdministradorMapeador } from '../mapeadores/Administrador.mapeador'
import { IRepositorioAdministradores } from '../puertos/IRepositorioAdministradores'

export class ServicioEditarPerfilAdministrador implements IServicioAplicacion {
  public constructor(
    private readonly repositorioAdministradores: IRepositorioAdministradores,
    private readonly busEventos: IBusEventos,
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
    comando: EditarPerfilAdministradorComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Restauramos al administrador de persistencia
      const administrador = await this.restaurarAdministrador(
        comando.idAdministrador,
      )

      // Mappeamos el comando a dominio
      const datosPerfil =
        AdministradorMapeador.convertirComandoEnEditarPerfil(comando)

      // Ejecutamos el servicio de dominio
      EditarPerfilAdministrador.editar(datosPerfil, administrador)

      // Persistimos los cambios
      await this.repositorioAdministradores.editar(
        AdministradorMapeador.convertirDominioEnPersistencia(administrador),
      )

      // Publicamos el evento
      this.busEventos.publicar(administrador.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>()
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
