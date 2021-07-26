import { Body, Controller, Get, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoActualizarPerfilEmpresa } from '../../cqrs/comandos/ActualizarPerfilEmpresa.comando'
import { QueryObtenerPerfilEmpresa } from '../../cqrs/queries/ObtenerPerfilEmpresa.query'
import { ActualizarDatosBasicosEmpleadorApiDTO } from '../../dto/ActualizarDatosBasicosEmpleador.api.dto'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { ErroresHttpPerfilEmpresa } from './perfil.errores'

@Controller('api/empleador/perfil')
export class ControladorPerfilEmpresa {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
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
