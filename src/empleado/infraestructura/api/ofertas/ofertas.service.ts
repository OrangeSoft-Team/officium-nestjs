import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VerDetallesOfertaLaboralPeticionDTO } from '../../../../empleado/aplicacion/dto/VerDetallesOfertaLaboral.dto'
import { ConsultarOfertasLaborales } from '../../../../empleado/aplicacion/servicios/ConsultarOfertasLaborales'
import { VerDetallesOfertaLaboral } from '../../../../empleado/aplicacion/servicios/VerDetallesOfertaLaboral'
import { Repository } from 'typeorm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'

@Injectable()
export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly servicioConsultarOfertasLaborales: ConsultarOfertasLaborales
  private readonly servicioVerDetallesOfertaLaboral: VerDetallesOfertaLaboral

  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly ofertaLaboralORM: Repository<OfertaLaboralORM>,
  ) {
    // generamos los adaptadores que debemos inyectar al caso de uso para que pueda funcionar
    this.repositorioOfertaLaboral = new RepositorioOfertaLaboral(
      this.ofertaLaboralORM,
    )
    this.servicioConsultarOfertasLaborales = new ConsultarOfertasLaborales(
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
}
