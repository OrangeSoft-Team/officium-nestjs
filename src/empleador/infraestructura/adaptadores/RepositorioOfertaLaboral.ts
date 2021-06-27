import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { OfertaLaboralYaExiste } from '../../aplicacion/excepciones/OfertaLaboralYaExiste'
import {
  IRepositorioOfertaLaboral,
  PersistirOfertaLaboralDTO,
} from '../../aplicacion/puertos/IRepositorioOfertaLaboral'

@Injectable()
export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly repositorioOferta: Repository<OfertaLaboralORM>,
    @InjectRepository(EmpresaORM)
    private readonly repositorioEmpresa: Repository<EmpresaORM>,
  ) {}

  public async crear(datos: PersistirOfertaLaboralDTO): Promise<void> {
    try {
      const ofertaLaboral = new OfertaLaboralORM()
      // obtenemos la empresa de la oferta laboral
      const empresa = await this.repositorioEmpresa.findOne({
        where: { uuid: datos.idEmpresa },
      })
      // asignamos todos los datos de la oferta laboral y los insertamos
      ofertaLaboral.uuid = datos.id
      ofertaLaboral.empresa = empresa
      ofertaLaboral.cargo = datos.cargo
      ofertaLaboral.descripcion = datos.descripcion
      ofertaLaboral.duracionEstimada = datos.duracionEstimada
      ofertaLaboral.escalaDuracion = datos.escalaDuracion
      ofertaLaboral.estado = datos.estado
      ofertaLaboral.fechaPublicacion = datos.fechaPublicacion
      ofertaLaboral.numeroVacantes = datos.numeroVacantes
      ofertaLaboral.sueldo = datos.sueldo
      ofertaLaboral.titulo = datos.titulo
      ofertaLaboral.turno = datos.turno
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
