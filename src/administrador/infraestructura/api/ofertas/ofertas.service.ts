import { GeneradorIdentificadorUUID } from '../../../../comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../../aplicacion/dto/oferta/CrearOfertaLaboralAdministrador.dto'
import { CrearOfertaLaboralAdministrador } from '../../../aplicacion/servicios/oferta/CrearOfertaLaboralAdministrador'
import { RepositorioEmpresa } from '../../adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'
import { ConsultarOfertasLaborales } from '../../../aplicacion/servicios/oferta/ConsultarOfertasLaboralesAdministrador'
import { VerDetallesOfertaLaboralAdministradorPeticionDTO } from '../../../aplicacion/dto/oferta/VerDetallesOfertaLaboralAdministrador.dto'
import { VerDetallesOfertaLaboralAdministrador } from '../../../aplicacion/servicios/oferta/VerDetallesOfertaLaboralAdministrador'

export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly repositorioEmpresa: RepositorioEmpresa
  private readonly generadorIdentificador: GeneradorIdentificadorUUID
  private readonly servicioCrearOfertaLaboral: CrearOfertaLaboralAdministrador
  private readonly servicioConsultarOfertasLaborales: ConsultarOfertasLaborales
  private readonly servicioVerDetallesOfertaLaboral: VerDetallesOfertaLaboralAdministrador

  public constructor() {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioOfertaLaboral = new RepositorioOfertaLaboral()
    this.repositorioEmpresa = new RepositorioEmpresa()
    this.generadorIdentificador = new GeneradorIdentificadorUUID()
    // Servicios/casos de uso de aplicación
    this.servicioCrearOfertaLaboral = new CrearOfertaLaboralAdministrador(
      this.repositorioOfertaLaboral,
      this.repositorioEmpresa,
      this.generadorIdentificador,
    )

    this.servicioConsultarOfertasLaborales = new ConsultarOfertasLaborales(
      this.repositorioOfertaLaboral,
    )

    this.servicioVerDetallesOfertaLaboral =
      new VerDetallesOfertaLaboralAdministrador(this.repositorioOfertaLaboral)
  }

  // Caso de uso 17.1 Administrador: Crear Oferta Laboral
  public async crearOfertaLaboralAdministrador(
    dto: CrearOfertaLaboralAdministradorSolicitudDTO,
  ) {
    return await this.servicioCrearOfertaLaboral.ejecutar(dto)
  }

  // Caso de uso 16.1 Administrador: Consultar Ofertas Laborales
  public async ConsultarOfertasLaboralesAdministrador() {
    return await this.servicioConsultarOfertasLaborales.ejecutar()
  }

  // Caso de uso 17.2 Administrador: Ver Detalles Oferta Laboral
  public async VerDetallesOfertaLaboralAdministrador(
    dto: VerDetallesOfertaLaboralAdministradorPeticionDTO,
  ) {
    return await this.servicioVerDetallesOfertaLaboral.ejecutar(dto)
  }
}
