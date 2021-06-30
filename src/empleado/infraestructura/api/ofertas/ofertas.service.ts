import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VerDetallesOfertaLaboralPeticionDTO } from 'src/empleado/aplicacion/dto/VerDetallesOfertaLaboral.dto'
import { ConsultarOfertasLaborales } from 'src/empleado/aplicacion/servicios/ConsultarOfertasLaborales'
import { VerDetallesOfertaLaboral } from 'src/empleado/aplicacion/servicios/VerDetallesOfertaLaboral'
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
      this.ofertaLaboralORM
    )
    this.servicioConsultarOfertasLaborales = new ConsultarOfertasLaborales(
      this.repositorioOfertaLaboral
    )
  }

  // Caso de uso 11.1 Empleado: Consultar Ofertas Laborales
  public async ConsultarOfertasLaborales() {
    return await this.servicioConsultarOfertasLaborales.ejecutar()
  }
  public async VerDetallesOfertaLaboral(dto: VerDetallesOfertaLaboralPeticionDTO) {
    return await this.servicioVerDetallesOfertaLaboral.ejecutar(dto)
  }
}
