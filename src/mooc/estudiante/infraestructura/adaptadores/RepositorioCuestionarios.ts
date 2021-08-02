import { getRepository } from "typeorm";
import { PreguntasCuestionarioDTO } from "../../aplicacion/dto/queries/ConsultarCuestionario.query";
import { ConsultarCuestionarioPersistenciaDTO, ConsultarCuestionariosPeticionDTO, IRepositorioCuestionarios } from "../../aplicacion/puertos/IRepositorioCuestionarios";
import { CuestionarioORM } from "../persistencia/Cuestionario.orm";


export class RepositorioCuestionarios implements IRepositorioCuestionarios{
    public async consultar(query: ConsultarCuestionariosPeticionDTO): Promise<ConsultarCuestionarioPersistenciaDTO> {
        const cuestionarioORM = getRepository(CuestionarioORM)
        
        const cuestionario = await cuestionarioORM.createQueryBuilder('cuestionarios')
        .innerJoinAndSelect('cuestionarios.curso','curso')
        .innerJoinAndSelect('cuestionarios.preguntas','preguntas')
        .where('curso.uuid = :uuid',{uuid: query.uuidCurso})
        .getOneOrFail()

        const preguntas: PreguntasCuestionarioDTO[] = cuestionario.preguntas.map((pregunta)=>{
            return{
                uuid: pregunta.uuid,
                enunciado: pregunta.enunciado,
                tipo: pregunta.tipo,
                ponderacion: pregunta.ponderacion,
                opciones: pregunta.opciones.map((opcion)=>{
                    return{
                        uuid: opcion.uuid,
                        valor: opcion.valor,
                    }
                })
            }
        }) 
        return {
            uuid: cuestionario.uuid,
            valorDuracion: cuestionario.valor_duracion,
            escalaDuracion: cuestionario.escala_duracion,
            intentosPermitidos: cuestionario.intentos_permitidos,
            preguntasCuestionarios: preguntas,
        }

    }
}