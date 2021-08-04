import { getRepository } from 'typeorm'
import {
  ConsultarCuestionarioPersistenciaDTO,
  ConsultarCuestionariosPeticionDTO,
  IRepositorioCuestionarios,
} from '../../aplicacion/puertos/IRepositorioCuestionarios'
import { CuestionarioORM } from '../persistencia/Cuestionario.orm'
import { OpcionORM } from '../persistencia/Opcion.orm'

export class RepositorioCuestionarios implements IRepositorioCuestionarios {
  public async consultar(
    query: ConsultarCuestionariosPeticionDTO,
  ): Promise<ConsultarCuestionarioPersistenciaDTO> {
    const cuestionarioORM = getRepository(CuestionarioORM)
    const opcionORM = getRepository(OpcionORM)

    const cuestionario = await cuestionarioORM
      .createQueryBuilder('cuestionarios')
      .innerJoinAndSelect('cuestionarios.curso', 'curso')
      .innerJoinAndSelect('cuestionarios.preguntas', 'preguntas')
      .where('curso.uuid = :uuid', { uuid: query.uuidCurso })
      .getOneOrFail()

    const preguntas = cuestionario.preguntas

    for (const pregunta of preguntas) {
      pregunta.opciones = await opcionORM
        .createQueryBuilder('opciones')
        .where('opciones.pregunta = :id', { id: pregunta.uuid })
        .getMany()
    }

    return {
      uuid: cuestionario.uuid,
      valorDuracion: parseInt(cuestionario.valor_duracion as any),
      escalaDuracion: cuestionario.escala_duracion,
      intentosPermitidos: parseInt(cuestionario.intentos_permitidos as any),
      preguntasCuestionarios: preguntas?.map((pregunta) => {
        return {
          uuid: pregunta.uuid,
          tipo: pregunta.tipo,
          enunciado: pregunta.enunciado,
          ponderacion: parseInt(pregunta.ponderacion as any),
          opciones: pregunta?.opciones.map((opcion) => {
            return {
              uuid: opcion.uuid,
              valor: opcion.valor,
              pregunta: opcion.pregunta,
            }
          }),
        }
      }),
    }
  }
}
