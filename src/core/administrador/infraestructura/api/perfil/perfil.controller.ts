import { Body, Controller, Get, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoEditarPerfilAdministrador } from '../../cqrs/comandos/EditarPerfilAdministrador.comando'
import { QueryObtenerPerfilAdministrador } from '../../cqrs/queries/ObtenerPerfilAdministrador.query'
import { ActualizarDatosBasicosAdministradorApiDTO } from '../../dto/ActualizarDatosBasicosAdministrador.api.dto'
import { DatosBasicosAdministradorApiDTO } from '../../dto/DatosBasicosAdministrador.api.dto'
import { AdministradorApiMapeador } from '../../mapeadores/Administrador.api.mapeador'
import { ErroresHttpPerfilAdministrador } from './perfil.errores'

@Controller('api/staff/perfil')
export class ControladorPerfilAdministrador {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiBasicAuth()
  @ApiTags('Core/Administrador')
  @ApiOkResponse({
    type: DatosBasicosAdministradorApiDTO,
    description:
      'Se obtuvieron los datos del perfil del administrador correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado al administrador.',
  })
  public async obtenerPerfilAdministrador(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryObtenerPerfilAdministrador(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpPerfilAdministrador.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return AdministradorApiMapeador.convertirRespuestaObtenerPerfilAdministrador(
      solicitud.valor,
    )
  }

  @Put()
  @ApiBasicAuth()
  @ApiTags('Core/Administrador')
  @ApiBody({ type: ActualizarDatosBasicosAdministradorApiDTO })
  @ApiOkResponse({
    description:
      'Se actualizaron los datos del perfil del administrador correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Algún dato especificado del administrador es invalido.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado al administrador.',
  })
  public async editarPerfilAdministrador(
    @Body() dto: Auth<ActualizarDatosBasicosAdministradorApiDTO>,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoEditarPerfilAdministrador(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpPerfilAdministrador.manejarExcepcion(excepcion, 'PUT')
    }

    // En caso de exito
    return
  }
}
