import { getRepository } from 'typeorm'
import {
  ConsultarCursoPersistenciaDTO,
  CursoPersistenciaDTO,
  InscribirEmpleadoPersistenciaDTO,
  IRepositorioCursos,
  ListadoCursosPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioCursos'
import { CursoORM } from '../persistencia/Curso.orm'
import { CursoEstudianteORM } from '../persistencia/CursoEstudiante.orm'
import { EstudianteORM } from '../persistencia/Estudiante.orm'

export class RepositorioCursos implements IRepositorioCursos {

  public async inscribirEmpleado(comando: InscribirEmpleadoPersistenciaDTO): Promise<void> {
    try{
      const cursoEstudianteORM = getRepository(CursoEstudianteORM)
      const estudianteORM = getRepository(EstudianteORM)
      const cursoORM = getRepository(CursoORM)

      const estudiante = await estudianteORM.findOneOrFail({
        where: {uuid: comando.uuidEstudiante}
      })
      const curso = await cursoORM.findOneOrFail({
        where: {uuid: comando.uuidCurso}
      })

      const cursoEstudiante = await cursoEstudianteORM.create(
        {
          curso: curso,
          empleado: estudiante,
        }
      )
      await cursoEstudianteORM.insert(cursoEstudiante)
    }catch{}
  }

  public async listar(): Promise<ListadoCursosPersistenciaDTO[]> {
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
          valorDuracion: curso.valor_duracion,
          escalaDuracion: curso.escala_duracion,
          fechaCreacion: curso.fecha_creacion,
          fechaUltimaModificacion: curso.fecha_ultima_modificacion,
        }
    } catch {}
  }
}
