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
import { ComandoActualizarPerfilEmpresa } from '../../cqrs/comandos/ActualizarPerfilEmpresa.comando'
import { QueryObtenerPerfilEmpresa } from '../../cqrs/queries/ObtenerPerfilEmpresa.query'
import { ActualizarDatosBasicosEmpleadorApiDTO } from '../../dto/ActualizarDatosBasicosEmpleador.api.dto'
import { DatosBasicosEmpleadorApiDTO } from '../../dto/DatosBasicosEmpleador.api.dto'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ErroresHttpPerfilEmpresa } from './perfil.errores'

@Controller('api/empleador/perfil')
export class ControladorPerfilEmpresa {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiTags('Core/Empleador')
  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'Se obtuvó el perfil de la empresa correctamente.',
    type: DatosBasicosEmpleadorApiDTO,
  })
  @ApiNotFoundResponse({
    description: 'La empresa especificada no se encuentra registrada.',
  })
  public async obtenerPerfilEmpresa(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryObtenerPerfilEmpresa(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpPerfilEmpresa.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpresaApiMapeador.convertirRespuestaObtenerPerfilEmpresa(
      solicitud.valor,
    )
  }

  @Put()
  @ApiTags('Core/Empleador')
  @ApiBasicAuth()
  @ApiBody({ type: ActualizarDatosBasicosEmpleadorApiDTO })
  @ApiBadRequestResponse({
    description:
      'Algún dato del perfil de la empresa especificada es invalido.',
  })
  @ApiNotFoundResponse({
    description: 'La empresa, país, estado, ciudad o habilidad no existe.',
  })
  @ApiOkResponse({
    description: 'Se ha actualizado el perfil de la empresa correctamente.',
  })
  public async actualizarPerfilEmpresa(
    @Body() dto: Auth<ActualizarDatosBasicosEmpleadorApiDTO>,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoActualizarPerfilEmpresa(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpPerfilEmpresa.manejarExcepcion(excepcion, 'PUT')
    }

    // En caso de exito
    return
  }
}
