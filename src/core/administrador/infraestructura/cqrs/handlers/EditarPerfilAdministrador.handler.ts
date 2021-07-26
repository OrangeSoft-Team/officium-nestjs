import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioEditarPerfilAdministrador } from '../../../aplicacion/servicios/ServicioEditarPerfilAdministrador'
import { RepositorioAdministradores } from '../../adaptadores/RepositorioAdministradores'
import { AdministradorApiMapeador } from '../../mapeadores/Administrador.api.mapeador'
import { ComandoEditarPerfilAdministrador } from '../comandos/EditarPerfilAdministrador.comando'

@CommandHandler(ComandoEditarPerfilAdministrador)
export class HandlerEditarPerfilAdministrador implements ICommandHandler {
  private readonly repositorioAdministradores: RepositorioAdministradores
  private readonly busEventos: BusEventos

  private readonly editarPerfilAdministrador: ServicioEditarPerfilAdministrador

  public constructor() {
    this.repositorioAdministradores = new RepositorioAdministradores()
    this.busEventos = new BusEventos()

    this.editarPerfilAdministrador = new ServicioEditarPerfilAdministrador(
      this.repositorioAdministradores,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoEditarPerfilAdministrador) {
    return this.editarPerfilAdministrador.ejecutar(
      AdministradorApiMapeador.convertirComandoEditarPerfilAdministrador(
        comando,
      ),
    )
  }
}
