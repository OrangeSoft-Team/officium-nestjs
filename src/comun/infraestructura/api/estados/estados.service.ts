import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { PaisORM } from '../../persistencia/Pais.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { RepositorioEstados } from '../../adaptadores/RepositorioEstados'
import { ObtenerEstadosSolicitudDTO } from '../../../aplicacion/dto/ObtenerEstados.dto'
import { ObtenerEstados } from '../../../aplicacion/servicios/ObtenerEstados'

@Injectable()
export class ServicioEstados {
  private readonly repositorioPaises: RepositorioPaises
  private readonly repositorioEstados: RepositorioEstados
  private readonly servicioObtenerEstados: ObtenerEstados

  public constructor(
    @InjectRepository(PaisORM)
    private readonly paisORM: Repository<PaisORM>,
    @InjectRepository(EstadoORM)
    private readonly estadoORM: Repository<EstadoORM>,
  ) {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises(this.paisORM)
    this.repositorioEstados = new RepositorioEstados(
      this.paisORM,
      this.estadoORM,
    )
    // Servicios/casos de uso de aplicación
    this.servicioObtenerEstados = new ObtenerEstados(
      this.repositorioEstados,
      this.repositorioPaises,
    )
  }

  // Caso de uso Comun: Obtener estados a partir de un país
  public async obtenerPorPais(dto: ObtenerEstadosSolicitudDTO) {
    return await this.servicioObtenerEstados.ejecutar(dto)
  }
}
