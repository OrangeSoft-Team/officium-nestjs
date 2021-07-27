import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoCrearEmpresa } from '../../cqrs/comandos/CrearEmpresa.comando'
import { ComandoEditarEmpresa } from '../../cqrs/comandos/EditarEmpresa.comando'
import { QueryVerDetalleEmpresa } from '../../cqrs/queries/VerDetalleEmpresa.query'
import { QueryVerListaEmpresas } from '../../cqrs/queries/VerListaEmpresas.query'
import { CrearEmpresaApiDTO } from '../../dto/CrearEmpresa.api.dto'
import { EditarEmpresaApiDTO } from '../../dto/EditarEmpresa.api.dto'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ErroresHttpEmpresasAdministrador } from './empresas.errores'

@Controller('api/staff/empresas')
export class ControladorEmpresasAdministrador {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  public async verListaEmpresas() {
    const solicitud = await this.queryBus.execute(new QueryVerListaEmpresas())

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpresasAdministrador.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpresaApiMapeador.convertirRespuestaVerListaEmpresas(
      solicitud.valor,
    )
  }

  @Get('/:uuid_empresa')
  public async verDetalleEmpresa(@Param('uuid_empresa') idEmpresa: string) {
    const solicitud = await this.queryBus.execute(
      new QueryVerDetalleEmpresa({ idEmpresa }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpresasAdministrador.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpresaApiMapeador.convertirRespuestaVerDetalleEmpresa(
      solicitud.valor,
    )
  }

  @Post()
  public async crearEmpresa(@Body() dto: CrearEmpresaApiDTO) {
    const solicitud = await this.commandBus.execute(
      new ComandoCrearEmpresa(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpresasAdministrador.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    return
  }

  @Put(':uuid_empresa')
  public async editarEmpresa(
    @Body() dto: EditarEmpresaApiDTO,
    @Param('uuid_empresa') idEmpresa: string,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoEditarEmpresa({ ...dto, idEmpresa }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpresasAdministrador.manejarExcepcion(excepcion, 'PUT')
    }

    // En caso de exito
    return
  }
}
