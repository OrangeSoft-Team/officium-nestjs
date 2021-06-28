import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GeneradorIdentificadorUUID } from '../../../../comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { EmpresaORM } from '../../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { CrearOfertaLaboralSolicitudDTO } from '../../../aplicacion/dto/CrearOfertaLaboral.dto'
import { VerOfertasLaboralesActivasSolicitudDTO } from '../../../aplicacion/dto/VerOfertasLaborales.dto'
import { CrearOfertaLaboral } from '../../../aplicacion/servicios/CrearOfertaLaboral'
import { VerOfertasLaboralesActivas } from '../../../aplicacion/servicios/VerOfertasLaboralesActivas'
import { RepositorioEmpresa } from '../../adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'

@Injectable()
export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly repositorioEmpresa: RepositorioEmpresa
  private readonly generadorIdentificador: GeneradorIdentificadorUUID
  private readonly servicioCrearOfertaLaboral: CrearOfertaLaboral
  private readonly servicioVerOfertasLaboralesActivas: VerOfertasLaboralesActivas

  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly ofertaLaboralORM: Repository<OfertaLaboralORM>,
    @InjectRepository(EmpresaORM)
    private readonly empresaORM: Repository<EmpresaORM>,
  ) {
    // Repositorios de datos y adaptadores inyectables en los servicios/casos de uso
    this.repositorioOfertaLaboral = new RepositorioOfertaLaboral(
      this.ofertaLaboralORM,
      this.empresaORM,
    )
    this.repositorioEmpresa = new RepositorioEmpresa(this.empresaORM)
    this.generadorIdentificador = new GeneradorIdentificadorUUID()
    // Servicios/casos de uso de aplicación
    this.servicioCrearOfertaLaboral = new CrearOfertaLaboral(
      this.repositorioOfertaLaboral,
      this.repositorioEmpresa,
      this.generadorIdentificador,
    )
    this.servicioVerOfertasLaboralesActivas = new VerOfertasLaboralesActivas(
      this.repositorioOfertaLaboral,
      this.repositorioEmpresa,
    )
  }

  // Caso de uso 7.1 Empleador: Ver Ofertas Laborales Activas
  public async obtenerOfertasLaboralesActivas(
    dto: VerOfertasLaboralesActivasSolicitudDTO,
  ) {
    return await this.servicioVerOfertasLaboralesActivas.ejecutar(dto)
  }

  // Caso de uso 8.1 Empleador: Crear Oferta Laboral
  public async crearOfertaLaboral(dto: CrearOfertaLaboralSolicitudDTO) {
    return await this.servicioCrearOfertaLaboral.ejecutar(dto)
  }
}
