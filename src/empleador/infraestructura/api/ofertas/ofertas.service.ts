import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GeneradorIdentificadorUUID } from '../../../../comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { EmpresaORM } from '../../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { CrearOfertaLaboralSolicitudDTO } from '../../../aplicacion/dto/CrearOfertaLaboral.dto'
import { CrearOfertaLaboral } from '../../../aplicacion/servicios/CrearOfertaLaboral'
import { RepositorioEmpresa } from '../../adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../adaptadores/RepositorioOfertaLaboral'

@Injectable()
export class ServicioOfertasLaborales {
  private readonly servicioCrearOfertaLaboral: CrearOfertaLaboral

  public constructor(
    @InjectRepository(EmpresaORM)
    private readonly repositorioEmpresa: Repository<EmpresaORM>,
    @InjectRepository(OfertaLaboralORM)
    private readonly repositorioOfertaLaboral: Repository<OfertaLaboralORM>,
  ) {
    // generamos los adaptadores que debemos inyectar al caso de uso para que pueda funcionar
    this.servicioCrearOfertaLaboral = new CrearOfertaLaboral(
      new RepositorioOfertaLaboral(
        repositorioOfertaLaboral,
        repositorioEmpresa,
      ),
      new RepositorioEmpresa(repositorioEmpresa),
      new GeneradorIdentificadorUUID(),
    )
  }

  // Caso de uso 8.1 Empleador: Crear Oferta Laboral
  public async crearOfertaLaboral(dto: CrearOfertaLaboralSolicitudDTO) {
    return await this.servicioCrearOfertaLaboral.ejecutar(dto)
  }
}
