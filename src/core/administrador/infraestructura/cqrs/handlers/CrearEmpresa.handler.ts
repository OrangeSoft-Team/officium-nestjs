import { HttpException, HttpStatus } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { BusEventos } from '../../../../../comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../../comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioCrearEmpresa } from '../../../aplicacion/servicios/ServicioCrearEmpresa'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ComandoCrearEmpresa } from '../comandos/CrearEmpresa.comando'

@CommandHandler(ComandoCrearEmpresa)
export class HandlerCrearEmpresa implements ICommandHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas
  private readonly busEventos: BusEventos
  private readonly servicioIdentificador: ServicioIdentificador

  private readonly crearEmpresa: ServicioCrearEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()
    this.busEventos = BusEventos.obtenerInstancia()
    this.servicioIdentificador = new ServicioIdentificador()

    this.crearEmpresa = new ServicioCrearEmpresa(
      this.repositorioEmpresas,
      this.servicioIdentificador,
      this.busEventos,
    )
  }

  public async execute(comando: ComandoCrearEmpresa) {
    if (!comando.datos.token)
      throw new HttpException(
        {
          mensaje: 'El token es requerido.',
          origen: 'TokenVacio',
        },
        HttpStatus.BAD_REQUEST,
      )

    return this.crearEmpresa.ejecutar(
      EmpresaApiMapeador.convertirComandoCrearEmpresa(comando),
    )
  }
}
