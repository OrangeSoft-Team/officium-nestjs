import { getRepository } from 'typeorm'
import {
  ConsultarCursoPersistenciaDTO,
  CursoPersistenciaDTO,
  IRepositorioCursos,
  ListadoCursosPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioCursos'
import { CursoORM } from '../persistencia/Curso.orm'

export class RepositorioCursos implements IRepositorioCursos {

  public async listar(): Promise<ListadoCursosPersistenciaDTO[]> {
    try {
      const cursoORM = getRepository(CursoORM)
      const lista = await cursoORM.createQueryBuilder('curso').getMany()
      const cursos: ListadoCursosPersistenciaDTO[] = lista.map((curso) => {
        return {
          uuid: curso.uuid,
          titulo: curso.titulo,
          estatus: curso.estatus,
          fechaCreacion: curso.fechaCreacion,
        }
      })
      return cursos
    } catch {}
  }

  public async consultar(query: ConsultarCursoPersistenciaDTO): Promise<CursoPersistenciaDTO> {
    try {
      const cursoORM = getRepository(CursoORM)
      const curso = await cursoORM.findOneOrFail({
        where: {uuid: query.uuid}
      })
        return {
          uuid: curso.uuid,
          titulo: curso.titulo,
          estatus: curso.estatus,
          valorDuracion: curso.duracionEstimadaValor,
          escalaDuracion: curso.duracionEstimadaEscala,
          fechaCreacion: curso.fechaCreacion,
          fechaUltimaModificacion: curso.fechaModificacion,
        }
    } catch {}
  }
}
