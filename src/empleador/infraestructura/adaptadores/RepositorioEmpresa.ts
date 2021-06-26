import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import {
  EmpresaExisteDTO,
  IRepositorioEmpresa,
} from '../../aplicacion/puertos/IRepositorioEmpresa'
import { EmpresaORM } from '../persistencia/Empresa.orm'

@Injectable()
export class RepositorioEmpresa implements IRepositorioEmpresa {
  public constructor(
    @InjectRepository(EmpresaORM)
    private readonly repositorioEmpresa: Repository<EmpresaORM>,
  ) {}

  public async existe(solicitud: IdentificadorDTO): Promise<EmpresaExisteDTO> {
    // TODO: Manejar excepcion de BD
    const empresa = await this.repositorioEmpresa.findOne(solicitud.id)
    return { existe: empresa?.uuid ? true : false }
  }
}
