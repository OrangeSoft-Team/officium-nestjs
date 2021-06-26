import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
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
      const empresa = await this.repositorioEmpresa.findOne(datos.idEmpresa)
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
      throw new ExcepcionAplicacion(
        datos,
        'No se ha podido guardar la oferta laboral.',
      )
    }
  }
}
