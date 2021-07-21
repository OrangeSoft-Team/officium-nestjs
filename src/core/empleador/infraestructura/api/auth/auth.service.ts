import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { QueryIniciarSesionEmpresa } from '../../cqrs/queries/IniciarSesionEmpresa.query'

@Injectable()
export class ServicioApiAuthEmpresa {
  public constructor(private readonly busQueries: QueryBus) {}

  public async autentificarEmpresa(query: QueryIniciarSesionEmpresa) {
    return this.busQueries.execute(query)
  }
}
