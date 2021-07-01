import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import {
  IRepositorioOfertaLaboral,
  ConsultarOfertaLaboralPersistenciaDTO,
  VerDetallesOfertaLaboralPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioOfertaLaboral'
import { Repository } from 'typeorm'

@Injectable()
export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public constructor(
    @InjectRepository(OfertaLaboralORM)
    private readonly repositorioOferta: Repository<OfertaLaboralORM>,
  ) {}

  public async listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]> {
    try {
      //Implementacion del repositorio, se hace el listado a persistencia
      const listadoOfertas = await this.repositorioOferta.find()
      return listadoOfertas.map((oferta) => {
        return {
          id: oferta.uuid,
          nombreEmpresa: oferta.empresa.nombre,
          ...oferta,
        }
      })
    } catch (error) {
      //En caso de alguna falla con la persistencia
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido procesar la solicitud.',
      )
    }
  }

  public async buscarOferta(
    peticion: IdentificadorDTO,
  ): Promise<VerDetallesOfertaLaboralPersistenciaDTO> {
    try {
      //Se busca el registro en persistencia
      const detalleOferta = await this.repositorioOferta.findOne({
        where: { uuid: peticion.id },
      })
      //Se arma el objeto de retorno
      return {
        id: detalleOferta.uuid,
        titulo: detalleOferta.titulo,
        fechaPublicacion: detalleOferta.fechaPublicacion,
        fechaModificacion: detalleOferta.fechaModificacion,
        cargo: detalleOferta.cargo,
        sueldo: detalleOferta.sueldo,
        descripcion: detalleOferta.descripcion,
        duracionEstimada: detalleOferta.duracionEstimada,
        escalaDuracion: detalleOferta.escalaDuracion,
        turno: detalleOferta.turno,
        numeroVacantes: detalleOferta.numeroVacantes,
        estado: detalleOferta.estado,
        uuidEmpresa: detalleOferta.empresa.uuid,
        nombreEmpresa: detalleOferta.empresa.nombre,
        calleEmpresa: detalleOferta.empresa.direccion.calle,
        codigoPostalEmpresa: detalleOferta.empresa.direccion.codigoPostal,
        ciudadEmpresa: detalleOferta.empresa.direccion.Ciudad.nombre,
      }
    } catch {
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido procesar la solicitud.',
      )
    }
  }
}
