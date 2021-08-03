import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryIniciarSesionAdministrador } from '../../cqrs/queries/IniciarSesionAdministrador.query'
import {
  DatosInicioSesionAdministradorApiDTO,
  DatosSesionAutenticadaAdministradorApiDTO,
} from '../../dto/DatosInicioSesionAdministrador.api.dto'
import { ErroresHttpAuthAdministrador } from './auth.errores'

@Controller('api/staff/auth')
export class ControladorAuthAdministrador {
  public constructor(private readonly queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth/Administrador')
  @ApiOkResponse({
    description: 'Los datos del administrador suministrados son correctos.',
    type: DatosSesionAutenticadaAdministradorApiDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Los datos del administrador suministrados son incorrectos.',
  })
  public async loginAdmin(
    @Body() dto: DatosInicioSesionAdministradorApiDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryIniciarSesionAdministrador(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      response.clearCookie('token')
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpAuthAdministrador.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    response.cookie('token', solicitud.valor.jwt, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.AUTH_EXPIRA)),
    })
    return solicitud.valor.sesion
  }

  @Post('/cerrar')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth/Administrador')
  @ApiOkResponse({ description: 'Se ha cerrado sesión correctamente.' })
  public cerrarSesionAdmin(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token')
    return
  }
}
