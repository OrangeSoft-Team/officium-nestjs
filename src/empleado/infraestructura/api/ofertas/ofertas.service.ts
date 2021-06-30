import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConsultarOfertasLaborales } from 'src/empleado/aplicacion/servicios/ConsultarOfertasLaborales'
import { Repository } from 'typeorm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'

@Injectable()
export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly servicioConsultarOfertasLaborales: ConsultarOfertasLaborales

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

  // Caso de uso 8.1 Empleador: Crear Oferta Laboral
  public async ConsultarOfertasLaborales() {
    return await this.servicioConsultarOfertasLaborales.ejecutar()
  }
}
