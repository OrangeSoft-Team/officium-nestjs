import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioEliminarEmpresa } from '../../../aplicacion/servicios/ServicioEliminarEmpresa'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ComandoEliminarEmpresa } from '../comandos/EliminarEmpresa.comando'

@CommandHandler(ComandoEliminarEmpresa)
export class HandlerEliminarEmpresa implements ICommandHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas
  private readonly busEventos: BusEventos

  private readonly eliminarEmpresa: ServicioEliminarEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()
    this.busEventos = BusEventos.obtenerInstancia()

    this.eliminarEmpresa = new ServicioEliminarEmpresa(
      this.repositorioEmpresas,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoEliminarEmpresa) {
    return this.eliminarEmpresa.ejecutar(
      EmpresaApiMapeador.convertirComandoEliminarEmpresa(comando),
    )
  }
}
