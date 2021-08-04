import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { CursoNoExiste } from '../../dominio/excepciones/curso/Curso.excepciones'
import {
  EstudianteInactivo,
  EstudianteNoExiste,
} from '../../dominio/excepciones/estudiante/Estudiante.excepciones'
import { ConsultarEstatusEstudiante } from '../../dominio/servicios/ConsultarEstatusEstudiante'
import { RestaurarEstudiante } from '../../dominio/servicios/RestaurarEstudiante'
import { InscribirseCursoComandoDTO } from '../dto/comandos/InscribirseCurso.comando'
import { CursoMapeador } from '../mapeadores/Curso.mapeador'
import { IRepositorioCursos } from '../puertos/IRepositorioCursos'
import { IRepositorioEstudiantes } from '../puertos/IRepositorioEstudiantes'

export class ServicioInscribirCursoEstudiante implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEstudiantes: IRepositorioEstudiantes,
    private readonly repositorioCursos: IRepositorioCursos,
    private readonly busEventos: IBusEventos,
  ) {}

  public async ejecutar(
    comando: InscribirseCursoComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      const estudiantePersistencia =
        await this.repositorioEstudiantes.consultar(comando.uuidEstudiante)
      if (!estudiantePersistencia)
        throw new EstudianteNoExiste('El estudiante no existe')
      if (ConsultarEstatusEstudiante.consultar(estudiantePersistencia.estatus))
        throw new EstudianteInactivo(
          'El estudiante no puede ser inscrito, se encuentra suspendido',
        )

      const cursoPersistencia = await this.repositorioCursos.consultar({
        uuid: comando.uuidCurso,
      })
      if (!cursoPersistencia)
        throw new CursoNoExiste('El curso no se ha encontrado.')

      const cursoDominio =
        CursoMapeador.ConvertirDetalleCursoDominio(cursoPersistencia)

      const estudianteDominio = RestaurarEstudiante.restaurar(
        estudiantePersistencia.uuidEstudiante,
        estudiantePersistencia.estatus,
      )
      estudianteDominio.agregarCurso(cursoDominio.uuid)
      await this.repositorioCursos.inscribirEmpleado({
        uuidCurso: comando.uuidCurso,
        uuidEstudiante: comando.uuidEstudiante,
      })

      this.busEventos.publicar(estudianteDominio.obtenerEventos())

      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
