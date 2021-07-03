import { ObtenerPaises } from '../../../aplicacion/servicios/ObtenerPaises'
import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'

export class ServicioPaises {
  private readonly repositorioPaises: RepositorioPaises
  private readonly servicioObtenerPaises: ObtenerPaises

  public constructor() {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises()
    // Servicios/casos de uso de aplicación
    this.servicioObtenerPaises = new ObtenerPaises(this.repositorioPaises)
  }

  // Caso de uso Comun: Obtener paises
  public async obtenerOfertasLaboralesActivas() {
    return await this.servicioObtenerPaises.ejecutar()
  }
}
