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
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response } from 'express'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryIniciarSesionEmpleado } from '../../cqrs/queries/IniciarSesionEmpleado.query'
import {
  DatosInicioSesionEmpleadoApiDTO,
  DatosSesionAutenticadaEmpleadoApiDTO,
} from '../../dto/DatosInicioSesionEmpleado.api.dto'
import { ErroresHttpAuthEmpleado } from './auth.errores'

@Controller('api/empleado/auth')
export class ControladorAuthEmpleado {
  public constructor(private readonly queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Los datos suministrados son correctos.',
    type: DatosSesionAutenticadaEmpleadoApiDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Los datos suministrados son incorrectos.',
  })
  @ApiBody({
    type: DatosInicioSesionEmpleadoApiDTO,
  })
  @ApiTags('Auth/Empleado')
  public async loginEmpleado(
    @Body() dto: DatosInicioSesionEmpleadoApiDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryIniciarSesionEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      response.clearCookie('token')
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpAuthEmpleado.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    response.cookie('token', solicitud.valor.jwt, {
      expires: new Date(Date.now() + parseInt(process.env.AUTH_EXPIRA)),
      secure: process.env.NODE_ENV == 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    })
    response.setHeader('authorization', solicitud.valor.jwt)
    return solicitud.valor.sesion
  }

  @Post('/cerrar')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth/Empleado')
  @ApiOkResponse({ description: 'Se ha cerrado sesión correctamente.' })
  public cerrarSesionEmpleado(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token')
    return
  }
}
