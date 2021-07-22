import { HttpStatus } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { sign } from 'jsonwebtoken'
import { ServicioIniciarSesionAdministrador } from '../../../aplicacion/servicios/ServicioIniciarSesionAdministrador'
import { RepositorioAdministradores } from '../../adaptadores/RepositorioAdministradores'
import { AdministradorApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { QueryIniciarSesionAdministrador } from '../queries/IniciarSesionAdministrador.query'

@QueryHandler(QueryIniciarSesionAdministrador)
export class HandlerIniciarSesionAdministrador implements IQueryHandler {
  private readonly repositorioAdministradores: RepositorioAdministradores

  private readonly servicioIniciarSesionAdministrador: ServicioIniciarSesionAdministrador

  public constructor() {
    this.repositorioAdministradores = new RepositorioAdministradores()

    this.servicioIniciarSesionAdministrador =
      new ServicioIniciarSesionAdministrador(this.repositorioAdministradores)
  }

  public async execute(query: QueryIniciarSesionAdministrador) {
    // Hasheamos el token
    if (!query.datos.token)
      throw new HttpException(
        {
          mensaje: 'El token de sesión no puede estar vacio.',
          origen: 'TokenSesionVacio',
        },
        HttpStatus.BAD_REQUEST,
      )

    // Ejecutamos servicio de iniciar sesión del administrador
    const solicitud = await this.servicioIniciarSesionAdministrador.ejecutar(
      AdministradorApiMapeador.convertirQueryIniciarSesionAdministrador(query),
    )

    if (solicitud.esExitoso) {
      const jwt = sign(solicitud.valor.id, process.env.JWT_SECRET)

      solicitud.valor.jwt = jwt

      solicitud.valor.sesion =
        AdministradorApiMapeador.convertirRespuestaIniciarSesionAdministrador({
          ...solicitud.valor,
        })
    }

    return solicitud
  }
}
