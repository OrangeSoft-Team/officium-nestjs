import { HttpException, HttpStatus } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { sign } from 'jsonwebtoken'
import { ServicioIniciarSesionEmpresa } from '../../../aplicacion/servicios/ServicioIniciarSesionEmpresa'
import { RepositorioEmpresas } from '../../adaptadores/RepositorioEmpresas'
import { EmpresaApiMapeador } from '../../mapeadores/Empresa.api.mapeador'
import { QueryIniciarSesionEmpresa } from '../queries/IniciarSesionEmpresa.query'

@QueryHandler(QueryIniciarSesionEmpresa)
export class HandlerIniciarSesionEmpresa implements IQueryHandler {
  private readonly repositorioEmpresas: RepositorioEmpresas

  private readonly servicioIniciarSesionEmpresa: ServicioIniciarSesionEmpresa

  public constructor() {
    this.repositorioEmpresas = new RepositorioEmpresas()

    this.servicioIniciarSesionEmpresa = new ServicioIniciarSesionEmpresa(
      this.repositorioEmpresas,
    )
  }

  public async execute(query: QueryIniciarSesionEmpresa) {
    // Hasheamos el token
    if (!query.datos.token)
      throw new HttpException(
        {
          mensaje: 'El token de sesión no puede estar vacio.',
          origen: 'TokenSesionVacio',
        },
        HttpStatus.BAD_REQUEST,
      )

    // Ejecutamos servicio de iniciar sesión del empleado
    const solicitud = await this.servicioIniciarSesionEmpresa.ejecutar(
      EmpresaApiMapeador.convertirQueryIniciarSesionEmpresa(query),
    )

    if (solicitud.esExitoso) {
      const jwt = sign(solicitud.valor.id, process.env.JWT_SECRET)

      solicitud.valor.jwt = jwt

      solicitud.valor.sesion =
        EmpresaApiMapeador.convertirRespuestaIniciarSesionEmpresa({
          ...solicitud.valor,
        })
    }

    return solicitud
  }
}
