import { getRepository } from 'typeorm'
import { EmpleadoORM } from '../../../comun/infraestructura/persistencia/Empleado.orm'
import { OfertaLaboralORM } from '../../../comun/infraestructura/persistencia/OfertaLaboral.orm'
import { PostulacionOfertaORM } from '../../../comun/infraestructura/persistencia/PostulacionOferta.orm'
import { EmpleadoNoExiste } from '../../aplicacion/excepciones/EmpleadoNoExiste'
import { OfertaLaboralNoExiste } from '../../aplicacion/excepciones/OfertaLaboralNoExiste'
import { PostulacionOfertaYaExiste } from '../../aplicacion/excepciones/PostulacionOfertaYaExiste'
import {
  IRepositorioPostulaciones,
  PostulacionOfertaPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioPostulaciones'

export class RepositorioPostulaciones implements IRepositorioPostulaciones {
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
