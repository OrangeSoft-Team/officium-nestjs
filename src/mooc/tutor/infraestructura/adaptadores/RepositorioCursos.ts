import { getRepository } from 'typeorm'
import {
  ConsultarCursoPersistenciaDTO,
  CursoPersistenciaDTO,
  IRepositorioCursos,
} from '../../aplicacion/puertos/IRepositorioCursos'
import { CursoORM } from '../persistencia/Curso.orm'

export class RepositorioCursos implements IRepositorioCursos {

/*   public async listar(): Promise<ListadoCursosPersistenciaDTO[]> {
    try {
      const cursoORM = getRepository(CursoORM)
      const lista = await cursoORM.createQueryBuilder('curso').getMany()
      const cursos: ListadoCursosPersistenciaDTO[] = lista.map((curso) => {
        return {
          uuid: curso.uuid,
          titulo: curso.titulo,
          estatus: curso.estatus,
          fechaCreacion: curso.fecha_creacion,
        }
      })
      return cursos
    } catch {}
  } */

  public async crear(datos: CursoPersistenciaDTO): Promise<void> {
    try {
      const cursoORM = getRepository(CursoORM)

      const curso = cursoORM.create({
        uuid: datos.uuid,
        titulo: datos.titulo,
        escala_duracion: datos.escalaDuracion,
        valor_duracion: datos.valorDuracion,
        habilidades: [],
      })

      await cursoORM.insert(curso)
    } catch {}
  }

  public async existe(id: string): Promise<boolean> {
    try {
      const cursoORM = getRepository(CursoORM)

      await cursoORM.findOneOrFail({ where: { uuid: id } })

      return true
    } catch {
      return false
    }
  }
}
