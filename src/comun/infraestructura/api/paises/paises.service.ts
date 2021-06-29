import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObtenerPaises } from '../../../aplicacion/servicios/ObtenerPaises'
import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { PaisORM } from '../../persistencia/Pais.orm'

@Injectable()
export class ServicioPaises {
  private readonly repositorioPaises: RepositorioPaises
  private readonly servicioObtenerPaises: ObtenerPaises

  public constructor(
    @InjectRepository(PaisORM)
    private readonly paisORM: Repository<PaisORM>,
  ) {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises(this.paisORM)
    // Servicios/casos de uso de aplicación
    this.servicioObtenerPaises = new ObtenerPaises(this.repositorioPaises)
  }

  // Caso de uso Comun: Obtener paises
  public async obtenerOfertasLaboralesActivas() {
    return await this.servicioObtenerPaises.ejecutar()
  }
}
