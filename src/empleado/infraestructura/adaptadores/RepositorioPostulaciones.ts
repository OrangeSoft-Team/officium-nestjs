import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { EmpleadoORM } from '../../../comun/infraestructura/persistencia/Empleado.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { PostulacionOfertaORM } from '../../../comun/infraestructura/persistencia/PostulacionOferta.orm'
import { EmpleadoNoExiste } from '../../aplicacion/excepciones/empleado/EmpleadoNoExiste'
import { OfertaLaboralNoExiste } from '../../aplicacion/excepciones/oferta/OfertaLaboralNoExiste'
import { PostulacionNoExiste } from '../../aplicacion/excepciones/postulacion/PostulacionNoExiste'
import { PostulacionOfertaYaExiste } from '../../aplicacion/excepciones/postulacion/PostulacionOfertaYaExiste'
import {
  ConsultarPostulacionesPersistenciaDTO,
  IRepositorioPostulaciones,
  PostulacionOfertaPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioPostulaciones'

export class RepositorioPostulaciones implements IRepositorioPostulaciones {

  public async consultar(peticion: IdentificadorDTO): Promise<ConsultarPostulacionesPersistenciaDTO[]> {
    try{
      const postulaciones = await getRepository(PostulacionOfertaORM).createQueryBuilder('postulacion')
      .innerJoinAndSelect('postulacion.oferta','oferta')
      .innerJoinAndSelect('oferta.empresa','empresa')
      .innerJoinAndSelect('postulacion.empleado','empleado')
      .where('empleado.uuid = :uuid', {uuid: peticion.id})
      .getMany()

      return postulaciones.map((postulacion)=>{
        return {
          uuid: postulacion.uuid,
          uuidOfertaLaboral: postulacion.oferta.uuid,
          tituloOferta: postulacion.oferta.titulo,
          cargoOferta: postulacion.oferta.cargo,
          nombreEmpresa: postulacion.oferta.empresa.nombre,
          estado: postulacion.estado,
          fecha: postulacion.fecha,
          comentario: postulacion.comentario,
        }
      })
    }
    catch(error){
      throw new PostulacionNoExiste(null, 'La postulacion no existe.')

    }

  }


  public async crear(datos: PostulacionOfertaPersistenciaDTO): Promise<void> {
    let oferta: OfertaLaboralORM
    let empleado: EmpleadoORM
    let postulacion: PostulacionOfertaORM = new PostulacionOfertaORM()

    try {
      oferta = await getRepository(OfertaLaboralORM).findOneOrFail({
        where: { uuid: datos.idOferta },
      })
    } catch (error) {
      throw new OfertaLaboralNoExiste(
        null,
        'La oferta laboral no se encuentra registrada.',
      )
    }

    try {
      empleado = await getRepository(EmpleadoORM).findOneOrFail({
        where: { uuid: datos.idEmpleado },
      })
    } catch (error) {
      throw new EmpleadoNoExiste(
        null,
        'El empleado no se encuentra registrado.',
      )
    }

    try {
      postulacion = {
        uuid: datos.id,
        oferta,
        empleado,
        fecha: datos.fecha,
        estado: datos.estado,
        comentario: datos.comentario,
      }
      await getRepository(PostulacionOfertaORM).insert(postulacion)
    } catch (error) {
      throw new PostulacionOfertaYaExiste(
        null,
        'La postulación a la oferta laboral ya se encuentra registrada.',
      )
    }
  }
}
