import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../../comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioEditarPerfilEmpresa } from '../../../aplicacion/servicios/ServicioEditarPerfilEmpresa'
import { RepositorioDirecciones } from '../../adaptadores/RepositorioDirecciones'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { RepositorioHabilidades } from '../../adaptadores/RepositorioHabilidades'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ComandoActualizarPerfilEmpresa } from '../comandos/ActualizarPerfilEmpresa.comando'

@CommandHandler(ComandoActualizarPerfilEmpresa)
export class HandlerActualizarPerfilEmpresa implements ICommandHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas
  private readonly repositorioHabilidades: RepositorioHabilidades
  private readonly repositorioDirecciones: RepositorioDirecciones
  private readonly servicioIdentificadores: ServicioIdentificador
  private readonly busEventos: BusEventos

  private readonly actualizarPerfilEmpresa: ServicioEditarPerfilEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()
    this.repositorioHabilidades = new RepositorioHabilidades()
    this.repositorioDirecciones = new RepositorioDirecciones()
    this.servicioIdentificadores = new ServicioIdentificador()
    this.busEventos = new BusEventos()

    this.actualizarPerfilEmpresa = new ServicioEditarPerfilEmpresa(
      this.repositorioEmpresas,
      this.repositorioDirecciones,
      this.repositorioHabilidades,
      this.servicioIdentificadores,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoActualizarPerfilEmpresa) {
    return this.actualizarPerfilEmpresa.ejecutar(
      EmpresaApiMapeador.convertirComandoEditarPerfilEmpresa(comando),
    )
  }
}
