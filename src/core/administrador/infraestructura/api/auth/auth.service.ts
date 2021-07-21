import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { QueryIniciarSesionAdministrador } from '../../cqrs/queries/IniciarSesionAdministrador.query'

@Injectable()
export class ServicioApiAuthAdministrador {
  public constructor(private readonly busQueries: QueryBus) {}

  public async autentificarAdministrador(
    query: QueryIniciarSesionAdministrador,
  ) {
    return this.busQueries.execute(query)
  }
}
