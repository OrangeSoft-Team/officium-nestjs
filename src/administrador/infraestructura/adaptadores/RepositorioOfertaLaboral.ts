import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { EmpresaNoExiste } from '../../aplicacion/excepciones/empresa/EmpresaNoExiste'
import { OfertaLaboralYaExiste } from '../../aplicacion/excepciones/oferta/OfertaLaboralYaExiste'
import {
  IdentificadorEmpresaDTO,
  ConsultarOfertaLaboralAdministradorPersistenciaDTO,
  IdentificadorOfertaLaboralDTO,
  IRepositorioOfertaLaboral,
  OfertaLaboralPersistenciaDTO,
  VerDetallesOfertaLaboralAdministradorPersistenciaDTO,
  OfertaLaboralExisteDTO,
} from '../../aplicacion/puertos/IRepositorioOfertaLaboral'
import { OfertaLaboralNoExiste } from '../../aplicacion/excepciones/oferta/OfertaLaboralNoExiste'
import { getRepository } from 'typeorm'

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public async crear(datos: OfertaLaboralPersistenciaDTO): Promise<void> {
    let empresa: EmpresaORM
    let ofertaLaboral: OfertaLaboralORM

    try {
      // obtenemos la empresa de la oferta laboral
      empresa = await getRepository(EmpresaORM).findOneOrFail({
        where: { uuid: datos.idEmpresa },
      })
    } catch (error) {
      throw new EmpresaNoExiste(
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
        postulaciones: [],
        fechaModificacion: datos?.fechaModificacion,
      }
      await getRepository(OfertaLaboralORM).insert(ofertaLaboral)
    } catch (error) {
      // En caso de que el insert falle debido a que ya existe la oferta laboral
      throw new OfertaLaboralYaExiste(
        'La oferta laboral ya se encuentra registrada.',
      )
    }
  }

  public async existe(
    dto: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralExisteDTO> {
    try {
      const oferta = await getRepository(OfertaLaboralORM).findOne({
        where: { uuid: dto.idOferta },
      })

      return { existe: oferta?.uuid ? true : false }
    } catch {
      throw new OfertaLaboralNoExiste('La oferta laboral no existe.')
    }
  }

  public async listar(): Promise<
    ConsultarOfertaLaboralAdministradorPersistenciaDTO[]
  > {
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
      throw new ExcepcionAplicacion('No se ha podido procesar la solicitud.')
    }
  }

  public async obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]> {
    try {
      // Obtenemos a la empresa involucrada
      const empresa = await getRepository(EmpresaORM).findOne({
        where: { uuid: solicitud.idEmpresa },
      })
      const ofertas = await getRepository(OfertaLaboralORM).find({
        where: { empresa },
      })
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
      throw new ExcepcionAplicacion('No se ha podido procesar la solicitud.')
    }
  }

  public async obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO> {
    try {
      // obtenemos la empresa
      const empresa = await getRepository(EmpresaORM).findOne({
        where: { uuid: solicitud.idEmpresa },
      })
      // obtenemos la oferta laboral
      const ofertaLaboral = await getRepository(OfertaLaboralORM).findOne({
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
        'No se ha podido buscar la oferta laboral de la empresa.',
      )
    }
  }

  public async buscarOferta(
    peticion: IdentificadorDTO,
  ): Promise<VerDetallesOfertaLaboralAdministradorPersistenciaDTO> {
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
      throw new OfertaLaboralNoExiste('La oferta laboral no existe.')
    }
  }
}
