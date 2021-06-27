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
    this.servicioCrearOfertaLaboral = new CrearOfertaLaboral(
      new RepositorioOfertaLaboral(
        repositorioOfertaLaboral,
        repositorioEmpresa,
      ),
      new RepositorioEmpresa(repositorioEmpresa),
      new GeneradorIdentificadorUUID(),
    )
  }

  public async crearOfertaLaboral(dto: CrearOfertaLaboralSolicitudDTO) {
    return await this.servicioCrearOfertaLaboral.ejecutar(dto)
  }
}
