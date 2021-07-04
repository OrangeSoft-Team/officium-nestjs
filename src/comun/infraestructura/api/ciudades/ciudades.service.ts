import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { RepositorioEstados } from '../../adaptadores/RepositorioEstados'
import { RepositorioCiudades } from '../../adaptadores/RepositorioCiudades'
import { ObtenerCiudades } from '../../../aplicacion/servicios/ObtenerCiudades'
import { ObtenerCiudadesSolicitudDTO } from '../../../aplicacion/dto/ObtenerCiudades.dto'

export class ServicioCiudades {
  private readonly repositorioPaises: RepositorioPaises
  private readonly repositorioEstados: RepositorioEstados
  private readonly repositorioCiudades: RepositorioCiudades
  private readonly servicioObtenerCiudades: ObtenerCiudades

  public constructor() {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises()
    this.repositorioEstados = new RepositorioEstados()
    this.repositorioCiudades = new RepositorioCiudades()
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
