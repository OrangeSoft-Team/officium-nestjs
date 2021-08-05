import { getRepository } from "typeorm";
import { HabilidadORM } from "../../infraestructura/persistencia/Habilidad.orm";
import { HabilidadesCursoPersistenciaDTO, HabilidadesPersistenciaDTO, IRepositorioHabilidades } from "../../aplicacion/puertos/IRepositorioHabilidades";
import { CursoORM } from "../persistencia/Curso.orm";


export class RepositorioHabilidades implements IRepositorioHabilidades {

    public async listar(query: HabilidadesCursoPersistenciaDTO): Promise<HabilidadesPersistenciaDTO[]> {

        try{
            const habilidadORM = getRepository(HabilidadORM) 
            const cursoORM = getRepository(CursoORM)
            const curso = cursoORM.findOneOrFail({
                where: {uuid: query.uuidCurso}
            })
            const habilidades = (
                await habilidadORM.find({
                    where: {curso}
                })
            ) || []
            return habilidades.map((habilidad) => {
                return {
                    uuid: habilidad.uuid,
                }
            })
        }catch{}

    }
}