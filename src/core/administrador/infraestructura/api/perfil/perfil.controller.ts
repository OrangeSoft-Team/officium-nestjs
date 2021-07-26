import { Body, Controller, Get, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoEditarPerfilAdministrador } from '../../cqrs/comandos/EditarPerfilAdministrador.comando'
import { QueryObtenerPerfilAdministrador } from '../../cqrs/queries/ObtenerPerfilAdministrador.query'
import { ActualizarDatosBasicosAdministradorApiDTO } from '../../dto/ActualizarDatosBasicosAdministrador.api.dto'
import { AdministradorApiMapeador } from '../../mapeadores/Administrador.api.mapeador'
import { ErroresHttpPerfilAdministrador } from './perfil.errores'

@Controller('api/staff/perfil')
export class ControladorPerfilAdministrador {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
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
