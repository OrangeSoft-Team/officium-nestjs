import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { EmpresaNoExiste } from '../../aplicacion/excepciones/EmpresaNoExiste'
import { OfertaLaboralYaExiste } from '../../aplicacion/excepciones/OfertaLaboralYaExiste'
import {
  IdentificadorEmpresaDTO,
  IdentificadorOfertaLaboralDTO,
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
    let empresa: EmpresaORM
    let ofertaLaboral: OfertaLaboralORM

    try {
      // obtenemos la empresa de la oferta laboral
      empresa = await this.repositorioEmpresa.findOneOrFail({
        where: { uuid: datos.idEmpresa },
      })
    } catch (error) {
      throw new EmpresaNoExiste(
        datos.idEmpresa,
        'La empresa especificada no existe en la base de datos.',
      )
    }
    try {
      ofertaLaboral = new OfertaLaboralORM()
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

  public async obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO> {
    try {
      // obtenemos la empresa
      const empresa = await this.repositorioEmpresa.findOne({
        where: { uuid: solicitud.idEmpresa },
      })
      // obtenemos la oferta laboral
      const ofertaLaboral = await this.repositorioOferta.findOne({
        where: { uuid: solicitud.idOfertaLaboral, empresa },
      })

      if (!ofertaLaboral) return null

      return {
        id: ofertaLaboral.uuid,
        idEmpresa: empresa.uuid,
        cargo: ofertaLaboral.cargo,
        descripcion: ofertaLaboral.descripcion,
        duracionEstimada: ofertaLaboral.duracionEstimada,
        escalaDuracion: ofertaLaboral.escalaDuracion,
        estado: ofertaLaboral.estado,
        fechaPublicacion: ofertaLaboral.fechaPublicacion,
        fechaModificacion: ofertaLaboral.fechaModificacion,
        numeroVacantes: ofertaLaboral.numeroVacantes,
        sueldo: ofertaLaboral.sueldo,
        turno: ofertaLaboral.turno,
        titulo: ofertaLaboral.titulo,
      }
    } catch (error) {
      // En caso de que la consulta falle
      throw new ExcepcionAplicacion(
        solicitud,
        'No se ha podido buscar la oferta laboral de la empresa.',
      )
    }
  }
}
