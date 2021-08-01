import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { Response } from 'express'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryIniciarSesionEmpresa } from '../../cqrs/queries/IniciarSesionEmpresa.query'
import { DatosInicioSesionEmpleadorApiDTO } from '../../dto/DatosInicioSesionEmpleador.api.dto'
import { ErroresHttpAuthEmpresa } from './auth.errores'

@Controller('api/empleador/auth')
export class ControladorAuthEmpresa {
  public constructor(private readonly queryBus: QueryBus) {}

  @Post()
  @HttpCode(HttpStatus.OK)
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
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.AUTH_EXPIRA)),
      sameSite: 'none',
      secure: true,
    })
    return solicitud.valor.sesion
  }

  @Post('/cerrar')
  @HttpCode(HttpStatus.OK)
  public cerrarSesionEmpleador(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token')
    return
  }
}
