import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryIniciarSesionAdministrador } from '../../cqrs/queries/IniciarSesionAdministrador.query'
import { DatosInicioSesionAdministradorApiDTO } from '../../dto/DatosInicioSesionAdministrador.api.dto'
import { ErroresHttpAuthAdministrador } from './auth.errores'
import { ServicioApiAuthAdministrador } from './auth.service'

@Controller('api/staff/auth')
export class ControladorAuthAdministrador {
  public constructor(
    private readonly servicioAuthAdministrador: ServicioApiAuthAdministrador,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async loginAdmin(
    @Body() dto: DatosInicioSesionAdministradorApiDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const solicitud =
      await this.servicioAuthAdministrador.autentificarAdministrador(
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
  public cerrarSesionAdmin(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token')
    return
  }
}
