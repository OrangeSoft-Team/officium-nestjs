import { getRepository } from "typeorm";
import { IRepositorioRespuestas, PreguntasPeticionDTO, PreguntasPersistenciaDTO } from "../../aplicacion/puertos/IRepositorioRespuestas";
import { PreguntaORM } from "../persistencia/Pregunta.orm";

export class RepositorioRespuestas implements IRepositorioRespuestas {

    public async consultar(comando: PreguntasPeticionDTO): Promise<PreguntasPersistenciaDTO[]> {

        const preguntaORM = getRepository(PreguntaORM)
        const preguntas = await preguntaORM.createQueryBuilder('preguntas')
        .innerJoinAndSelect('preguntas.cuestionario','cuestionario')
        .innerJoinAndSelect('preguntas.opciones','opciones')
        .where('cuestionario.uuid = :uuid',{uuid: comando.uuidCuestionario})
        .getMany()
        return preguntas.map((pregunta) => {
            return{
                uuid: pregunta.uuid,
                enunciado: pregunta.enunciado,
                tipo: pregunta.tipo,
                ponderacion: pregunta.ponderacion,
                opciones: pregunta.opciones
            }
        })
    }
}