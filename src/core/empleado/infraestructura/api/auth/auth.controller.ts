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
import { QueryIniciarSesionEmpleado } from '../../cqrs/queries/IniciarSesionEmpleado.query'
import { DatosInicioSesionEmpleadoApiDTO } from '../../dto/DatosInicioSesionEmpleado.api.dto'
import { ErroresHttpAuthEmpleado } from './auth.errores'
import { ServicioApiAuthEmpleado } from './auth.service'

@Controller('api/empleado/auth')
export class ControladorAuthEmpleado {
  public constructor(
    private readonly servicioAuthEmpleado: ServicioApiAuthEmpleado,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async registrarEmpleado(
    @Body() dto: DatosInicioSesionEmpleadoApiDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const solicitud = await this.servicioAuthEmpleado.autentificarEmpleado(
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
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.AUTH_EXPIRA)),
    })
    return
  }
}
