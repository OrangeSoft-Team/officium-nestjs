import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import {
  EmpresaExisteDTO,
  IRepositorioEmpresa,
} from '../../aplicacion/puertos/IRepositorioEmpresa'

@Injectable()
export class RepositorioEmpresa implements IRepositorioEmpresa {
  public constructor(
    @InjectRepository(EmpresaORM)
    private readonly repositorioEmpresa: Repository<EmpresaORM>,
  ) {}

  public async existe(solicitud: IdentificadorDTO): Promise<EmpresaExisteDTO> {
    try {
      const empresa = await this.repositorioEmpresa.findOne(solicitud.id)
      return { existe: empresa?.uuid ? true : false }
    } catch (error) {
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido verificar la existencia de la empresa.',
      )
    }
  }
}
