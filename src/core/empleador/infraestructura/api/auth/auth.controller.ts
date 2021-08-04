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
import { QueryIniciarSesionEmpresa } from '../../cqrs/queries/IniciarSesionEmpresa.query'
import {
  DatosInicioSesionEmpleadorApiDTO,
  DatosSesionAutenticadaEmpresaApiDTO,
} from '../../dto/DatosInicioSesionEmpleador.api.dto'
import { ErroresHttpAuthEmpresa } from './auth.errores'

@Controller('api/empleador/auth')
export class ControladorAuthEmpresa {
  public constructor(private readonly queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth/Empleador')
  @ApiBody({ type: DatosInicioSesionEmpleadorApiDTO })
  @ApiOkResponse({
    type: DatosSesionAutenticadaEmpresaApiDTO,
    description: 'Los datos de la empresa suministrada son correctos.',
  })
  @ApiUnauthorizedResponse({
    description: 'Los datos de la empresa suministrada son incorrectos.',
  })
  public async loginEmpleador(
    @Body() dto: DatosInicioSesionEmpleadorApiDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryIniciarSesionEmpresa(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      response.clearCookie('token')
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpAuthEmpresa.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    response.cookie('token', solicitud.valor.jwt, {
      expires: new Date(Date.now() + parseInt(process.env.AUTH_EXPIRA)),
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV == 'production',
    })
    response.setHeader('Authorization', solicitud.valor.jwt)
    return solicitud.valor.sesion
  }

  @Post('/cerrar')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth/Empleador')
  @ApiOkResponse({
    description: 'Se ha cerrado la sesión de la empresa correctamente.',
  })
  public cerrarSesionEmpleador(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token')
    return
  }
}
