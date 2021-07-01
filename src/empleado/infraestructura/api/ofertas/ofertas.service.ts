import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'
import { PostularseOfertaLaboral } from '../../../aplicacion/servicios/PostularseOfertaLaboral'
import { RepositorioPostulaciones } from '../../adaptadores/RepositorioPostulaciones'
import { RepositorioEmpleado } from '../../adaptadores/RepositorioEmpleado'
import { GeneradorIdentificadorUUID } from '../../../../comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { PostularseOfertaLaboralSolicitudDTO } from '../../../aplicacion/dto/PostularseOfertaLaboral.dto'
import { VerDetallesOfertaLaboralPeticionDTO } from '../../../aplicacion/dto/VerDetallesOfertaLaboral.dto'
import { ConsultarOfertasLaborales } from '../../../aplicacion/servicios/ConsultarOfertasLaborales'
import { VerDetallesOfertaLaboral } from '../../../aplicacion/servicios/VerDetallesOfertaLaboral'

@Injectable()
export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly repostiorioEmpleado: RepositorioEmpleado
  private readonly repositorioPostulaciones: RepositorioPostulaciones
  private readonly servicioIdentificador: GeneradorIdentificadorUUID
  private readonly servicioConsultarOfertasLaborales: ConsultarOfertasLaborales
  private readonly servicioPostularseOfertaLaboral: PostularseOfertaLaboral
  private readonly servicioVerDetallesOfertaLaboral: VerDetallesOfertaLaboral

  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly ofertaLaboralORM: Repository<OfertaLaboralORM>,
  ) {
    // generamos los adaptadores que debemos inyectar al caso de uso para que pueda funcionar
    this.repositorioOfertaLaboral = new RepositorioOfertaLaboral()
    this.repostiorioEmpleado = new RepositorioEmpleado()
    this.repositorioPostulaciones = new RepositorioPostulaciones()
    this.servicioIdentificador = new GeneradorIdentificadorUUID()

    this.servicioConsultarOfertasLaborales = new ConsultarOfertasLaborales(
      this.repositorioOfertaLaboral,
    )
    this.servicioVerDetallesOfertaLaboral = new VerDetallesOfertaLaboral(
      this.repositorioOfertaLaboral,
    )
    this.servicioPostularseOfertaLaboral = new PostularseOfertaLaboral(
      this.servicioIdentificador,
      this.repositorioPostulaciones,
      this.repostiorioEmpleado,
      this.repositorioOfertaLaboral,
    )
  }

  // Caso de uso 11.1 Empleado: Consultar Ofertas Laborales
  public async ConsultarOfertasLaborales() {
    return await this.servicioConsultarOfertasLaborales.ejecutar()
  }

  // Caso de uso 12.1 Empleado: Ver Detalles Oferta Laboral
  public async VerDetallesOfertaLaboral(
    dto: VerDetallesOfertaLaboralPeticionDTO,
  ) {
    return await this.servicioVerDetallesOfertaLaboral.ejecutar(dto)
  }

  // Caso de uso 13.1 Empleado: Aplicar a oferta laboral
  public async postularseOfertLaboral(
    dto: PostularseOfertaLaboralSolicitudDTO,
  ) {
    return await this.servicioPostularseOfertaLaboral.ejecutar(dto)
  }
}
