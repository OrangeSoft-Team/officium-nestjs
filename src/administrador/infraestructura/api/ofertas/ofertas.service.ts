import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GeneradorIdentificadorUUID } from '../../../../comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { EmpresaORM } from '../../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../../aplicacion/dto/CrearOfertaLaboralAdministrador.dto'
import { CrearOfertaLaboralAdministrador } from '../../../aplicacion/servicios/CrearOfertaLaboralAdministrador'
import { RepositorioEmpresa } from '../../adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'
import { ConsultarOfertasLaboralesAdministradorDTO } from '../../../aplicacion/dto/ConsultarOfertasLaboralesAdministrador.dto';
import { ConsultarOfertasLaborales } from '../../../aplicacion/servicios/ConsultarOfertasLaboralesAdministrador';

@Injectable()
export class ServicioOfertasLaborales {
  private readonly repositorioOfertaLaboral: RepositorioOfertaLaboral
  private readonly repositorioEmpresa: RepositorioEmpresa
  private readonly generadorIdentificador: GeneradorIdentificadorUUID
  private readonly servicioCrearOfertaLaboral: CrearOfertaLaboralAdministrador
  private readonly servicioConsultarOfertasLaborales: ConsultarOfertasLaborales

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
    this.servicioCrearOfertaLaboral = new CrearOfertaLaboralAdministrador(
      this.repositorioOfertaLaboral,
      this.repositorioEmpresa,
      this.generadorIdentificador,
    )

    this.servicioConsultarOfertasLaborales = new ConsultarOfertasLaborales(
      this.repositorioOfertaLaboral,
    )
  }

  // Caso de uso 17.2 Administrador: Crear Oferta Laboral
  public async crearOfertaLaboralAdministrador(dto: CrearOfertaLaboralAdministradorSolicitudDTO) {
    return await this.servicioCrearOfertaLaboral.ejecutar(dto)
  }

  // Caso de uso 16.1 Administrador: Consultar Ofertas Laborales
  public async ConsultarOfertasLaboralesAdministrador() {
    return await this.servicioConsultarOfertasLaborales.ejecutar()
  }

 

 
}
