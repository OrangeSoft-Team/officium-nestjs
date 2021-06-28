import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { OfertaLaboralYaExiste } from '../../aplicacion/excepciones/OfertaLaboralYaExiste'
import {
  IdentificadorEmpresaDTO,
  IRepositorioOfertaLaboral,
  OfertaLaboralPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioOfertaLaboral'

@Injectable()
export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly repositorioOferta: Repository<OfertaLaboralORM>,
    @InjectRepository(EmpresaORM)
    private readonly repositorioEmpresa: Repository<EmpresaORM>,
  ) {}

  public async obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]> {
    try {
      // Obtenemos a la empresa involucrada
      const empresa = await this.repositorioEmpresa.findOne({
        where: { uuid: solicitud.idEmpresa },
      })
      const ofertas = await this.repositorioOferta.find({ where: { empresa } })
      // retornamos la oferta
      return ofertas.map((oferta) => {
        return {
          id: oferta.uuid,
          idEmpresa: empresa.uuid,
          ...oferta,
        }
      })
    } catch (error) {
      // En caso de que el insert falle debido a que ya existe la oferta laboral
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido procesar la solicitud.',
      )
    }
  }

  public async crear(datos: OfertaLaboralPersistenciaDTO): Promise<void> {
    try {
      let ofertaLaboral = new OfertaLaboralORM()
      // obtenemos la empresa de la oferta laboral
      const empresa = await this.repositorioEmpresa.findOne({
        where: { uuid: datos.idEmpresa },
      })
      // asignamos todos los datos de la oferta laboral y los insertamos
      ofertaLaboral = {
        uuid: datos.id,
        empresa,
        ...datos,
        fechaModificacion: datos?.fechaModificacion,
      }
      await this.repositorioOferta.insert(ofertaLaboral)
    } catch (error) {
      // En caso de que el insert falle debido a que ya existe la oferta laboral
      throw new OfertaLaboralYaExiste(
        datos,
        'La oferta laboral ya se encuentra registrada.',
      )
    }
  }
}
