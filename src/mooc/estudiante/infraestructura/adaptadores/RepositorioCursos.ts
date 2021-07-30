import { getRepository } from 'typeorm'
import { IRepositorioCursos, ListadoCursosPersistenciaDTO } from '../../aplicacion/puertos/IRepositorioCursos'
import { CursoORM } from '../persistencia/Curso.orm'

export class RepositorioCursos implements IRepositorioCursos {
    public async listar(): Promise<ListadoCursosPersistenciaDTO[]>{
        try{
            const cursoORM = getRepository(CursoORM)
            const lista = await cursoORM.createQueryBuilder('curso')
            .getMany()
            const cursos: ListadoCursosPersistenciaDTO[] = lista.map(
                (curso) =>{
                    return {
                        uuid: curso.uuid,
                        titulo: curso.titulo,
                        estatus: curso.estatus, 
                        fechaCreacion: curso.fechaCreacion,
                    }
                }
            )
            return cursos
        }
        catch{
        }
    }
}