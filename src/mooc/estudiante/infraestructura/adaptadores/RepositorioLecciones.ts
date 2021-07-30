import { getRepository } from "typeorm";
import { LeccionORM } from "../../infraestructura/persistencia/Leccion.orm";
import { CursoORM } from "../persistencia/Curso.orm";
import { IRepositorioLecciones, LeccionesCursoPersistenciaDTO, LeccionesPersistenciaDTO } from "../../aplicacion/puertos/IRepositorioLecciones";


export class RepositorioLecciones implements IRepositorioLecciones {

    public async listar(query: LeccionesCursoPersistenciaDTO): Promise<LeccionesPersistenciaDTO[]> {

        try{
            const leccionORM = getRepository(LeccionORM) 
            const cursoORM = getRepository(CursoORM)
            const curso = cursoORM.findOneOrFail({
                where: {uuid: query.uuidCurso}
            })
            const lecciones = (
                await leccionORM.find({
                    where: {curso}
                })
            ) || []
            return lecciones.map((leccion) => {
                return {
                    uuid: leccion.uuid,
                    titulo: leccion.titulo,
                }
            })
        }catch{}

    }
}