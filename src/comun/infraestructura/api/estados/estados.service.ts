import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { RepositorioEstados } from '../../adaptadores/RepositorioEstados'
import { ObtenerEstadosSolicitudDTO } from '../../../aplicacion/dto/ObtenerEstados.dto'
import { ObtenerEstados } from '../../../aplicacion/servicios/ObtenerEstados'

export class ServicioEstados {
  private readonly repositorioPaises: RepositorioPaises
  private readonly repositorioEstados: RepositorioEstados
  private readonly servicioObtenerEstados: ObtenerEstados

  public constructor() {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioPaises = new RepositorioPaises()
    this.repositorioEstados = new RepositorioEstados()
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
