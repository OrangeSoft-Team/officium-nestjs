import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import {
  IRepositorioOfertaLaboral,
  ConsultarOfertaLaboralPersistenciaDTO,
  VerDetallesOfertaLaboralPersistenciaDTO,
  IdentificadorOfertaLaboralDTO,
  OfertaLaboralExisteDTO,
} from '../../aplicacion/puertos/IRepositorioOfertaLaboral'
import { getRepository } from 'typeorm'
import { OfertaLaboralNoExiste } from '../../aplicacion/excepciones/OfertaLaboralNoExiste'

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public async existe(
    dto: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralExisteDTO> {
    try {
      const oferta = await getRepository(OfertaLaboralORM).findOne({
        where: { uuid: dto.idOferta },
      })

      return { existe: oferta?.uuid ? true : false }
    } catch {
      throw new OfertaLaboralNoExiste(null, 'La oferta laboral no existe.')
    }
  }

  public async listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]> {
    try {
      //Implementacion del repositorio, se hace el listado a persistencia
      const listadoOfertas = await getRepository(OfertaLaboralORM)
        .createQueryBuilder('oferta')
        .innerJoinAndSelect('oferta.empresa', 'empresa')
        .getMany()
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
      const detalleOferta = await getRepository(OfertaLaboralORM)
        .createQueryBuilder('oferta')
        .innerJoinAndSelect('oferta.empresa', 'empresa')
        .innerJoinAndSelect('empresa.direccion', 'direccion')
        .innerJoinAndSelect('direccion.ciudad', 'ciudad')
        .where('oferta.uuid = :uuid', { uuid: peticion.id })
        .getOneOrFail()

      // Se arma el objeto de retorno
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
        ciudadEmpresa: detalleOferta.empresa.direccion.ciudad.nombre,
      }
    } catch (error) {
      throw new OfertaLaboralNoExiste(null, 'La oferta laboral no existe.')
    }
  }
}
