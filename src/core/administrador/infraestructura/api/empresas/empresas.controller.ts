import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoCrearEmpresa } from '../../cqrs/comandos/CrearEmpresa.comando'
import { ComandoEditarEmpresa } from '../../cqrs/comandos/EditarEmpresa.comando'
import { ComandoEliminarEmpresa } from '../../cqrs/comandos/EliminarEmpresa.comando'
import { QueryVerDetalleEmpresa } from '../../cqrs/queries/VerDetalleEmpresa.query'
import { QueryVerListaEmpresas } from '../../cqrs/queries/VerListaEmpresas.query'
import { CrearEmpresaApiDTO } from '../../dto/CrearEmpresa.api.dto'
import { DetalleEmpresaApiDTO } from '../../dto/DetalleEmpresa.api.dto'
import { EditarEmpresaApiDTO } from '../../dto/EditarEmpresa.api.dto'
import { ListaEmpresasApiDTO } from '../../dto/ListaEmpresa.api.dto'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ErroresHttpEmpresasAdministrador } from './empresas.errores'

@Controller('api/staff/empresas')
export class ControladorEmpresasAdministrador {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiTags('Core/Administrador')
  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'Se obtuvo la lista de empresas correctamente.',
    type: ListaEmpresasApiDTO,
  })
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
  @ApiTags('Core/Administrador')
  @ApiBasicAuth()
  @ApiOkResponse({
    description:
      'Se obtuvo los detalles de la empresa especificada correctamente.',
    type: DetalleEmpresaApiDTO,
  })
  @ApiNotFoundResponse({
    description: 'La empresa especificada no se encuentra registrada.',
  })
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
  @ApiTags('Core/Administrador')
  @ApiBasicAuth()
  @ApiBody({ type: CrearEmpresaApiDTO })
  @ApiOkResponse({ description: 'Se ha creado la empresa correctamente.' })
  @ApiBadRequestResponse({
    description: 'Algún dato especificado de la empresa es invalido.',
  })
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
  @ApiTags('Core/Administrador')
  @ApiBasicAuth()
  @ApiBody({ type: EditarEmpresaApiDTO })
  @ApiParam({
    type: 'string',
    name: 'uuid_empresa',
    example: '07e1c051-4a63-427f-86db-14c63a4946eb',
  })
  @ApiOkResponse({
    description:
      'Se editaron los datos de la empresa especificada correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'La empresa especificada no se encuentra registrada.',
  })
  @ApiBadRequestResponse({
    description: 'Algún dato especificado de la empresa es invalido.',
  })
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

  @Delete(':uuid_empresa')
  @ApiTags('Core/Administrador')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_empresa',
    example: '07e1c051-4a63-427f-86db-14c63a4946eb',
  })
  @ApiOkResponse({
    description: 'Se eliminó empresa especificada correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'La empresa especificada no se encuentra registrada.',
  })
  public async eliminarEmpresa(@Param('uuid_empresa') idEmpresa: string) {
    const solicitud = await this.commandBus.execute(
      new ComandoEliminarEmpresa({ idEmpresa }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpresasAdministrador.manejarExcepcion(excepcion, 'DELETE')
    }

    // En caso de exito
    return
  }
}
