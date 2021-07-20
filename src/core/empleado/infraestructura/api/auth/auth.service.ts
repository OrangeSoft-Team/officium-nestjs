import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { QueryIniciarSesionEmpleado } from '../../cqrs/queries/IniciarSesionEmpleado.query'

@Injectable()
export class ServicioApiAuthEmpleado {
  public constructor(private readonly busQueries: QueryBus) {}

  public async autentificarEmpleado(query: QueryIniciarSesionEmpleado) {
    return this.busQueries.execute(query)
  }
}
