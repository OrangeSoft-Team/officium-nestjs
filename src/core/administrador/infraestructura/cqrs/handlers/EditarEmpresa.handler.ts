import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioEditarEmpresa } from '../../../aplicacion/servicios/ServicioEditarEmpresa'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ComandoEditarEmpresa } from '../comandos/EditarEmpresa.comando'

@CommandHandler(ComandoEditarEmpresa)
export class HandlerEditarEmpresa implements ICommandHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas
  private readonly busEventos: BusEventos

  private readonly editarEmpresa: ServicioEditarEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()
    this.busEventos = BusEventos.obtenerInstancia()

    this.editarEmpresa = new ServicioEditarEmpresa(
      this.repositorioEmpresas,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoEditarEmpresa) {
    return this.editarEmpresa.ejecutar(
      EmpresaApiMapeador.convertirComandoEditarEmpresa(comando),
    )
  }
}
