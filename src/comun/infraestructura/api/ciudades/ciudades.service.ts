import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { PaisORM } from '../../persistencia/Pais.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { RepositorioEstados } from '../../adaptadores/RepositorioEstados'
import { RepositorioCiudades } from '../../adaptadores/RepositorioCiudades'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { ObtenerCiudades } from '../../../aplicacion/servicios/ObtenerCiudades'
import { ObtenerCiudadesSolicitudDTO } from '../../../aplicacion/dto/ObtenerCiudades.dto'

@Injectable()
export class ServicioCiudades {
  private readonly repositorioPaises: RepositorioPaises
  private readonly repositorioEstados: RepositorioEstados
  private readonly repositorioCiudades: RepositorioCiudades
  private readonly servicioObtenerCiudades: ObtenerCiudades

  public constructor(
    @InjectRepository(PaisORM)
    private readonly paisORM: Repository<PaisORM>,
    @InjectRepository(EstadoORM)
    private readonly estadoORM: Repository<EstadoORM>,
    @InjectRepository(CiudadORM)
    private readonly ciudadORM: Repository<CiudadORM>,
  ) {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises(this.paisORM)
    this.repositorioEstados = new RepositorioEstados(
      this.paisORM,
      this.estadoORM,
    )
    this.repositorioCiudades = new RepositorioCiudades(
      this.estadoORM,
      this.ciudadORM,
    )
    // Servicios/casos de uso de aplicación
    this.servicioObtenerCiudades = new ObtenerCiudades(
      this.repositorioCiudades,
      this.repositorioEstados,
      this.repositorioPaises,
    )
  }

  // Caso de uso Comun: Obtener ciudades a partir de un país y estado
  public async obtenerPorPais(dto: ObtenerCiudadesSolicitudDTO) {
    return await this.servicioObtenerCiudades.ejecutar(dto)
  }
}
