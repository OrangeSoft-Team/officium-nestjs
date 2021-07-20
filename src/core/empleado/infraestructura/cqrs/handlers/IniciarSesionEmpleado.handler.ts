import { HttpException, HttpStatus } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { sign } from 'jsonwebtoken'
import { ServicioIniciarSesionEmpleado } from '../../../aplicacion/servicios/ServicioIniciarSesionEmpleado'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { QueryIniciarSesionEmpleado } from '../queries/IniciarSesionEmpleado.query'

@QueryHandler(QueryIniciarSesionEmpleado)
export class HandlerIniciarSesionEmpleado implements IQueryHandler {
  private readonly repositorioEmpleados: RepositorioEmpleados

  private readonly servicioIniciarSesionEmpleado: ServicioIniciarSesionEmpleado

  public constructor() {
    this.repositorioEmpleados = new RepositorioEmpleados()

    this.servicioIniciarSesionEmpleado = new ServicioIniciarSesionEmpleado(
      this.repositorioEmpleados,
    )
  }

  public async execute(query: QueryIniciarSesionEmpleado) {
    // Hasheamos el token
    if (!query.datos.token)
      throw new HttpException(
        {
          mensaje: 'El formato de la fecha debe ser "dd/mm/yyyy".',
          origen: 'FormatoFechaInvalido',
        },
        HttpStatus.BAD_REQUEST,
      )

    // Ejecutamos servicio de iniciar sesión del empleado
    const solicitud = await this.servicioIniciarSesionEmpleado.ejecutar(
      EmpleadoApiMapeador.transformarQueryIniciarSesionEmpleado(query),
    )

    if (solicitud.esExitoso) {
      const jwt = sign(solicitud.valor.id, process.env.JWT_SECRET)

      solicitud.valor.jwt = jwt
    }

    return solicitud
  }
}
