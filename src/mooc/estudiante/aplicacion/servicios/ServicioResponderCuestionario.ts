import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { CursoNoExiste } from '../../dominio/excepciones/curso/Curso.excepciones'
import { EstudianteNoExiste } from '../../dominio/excepciones/estudiante/Estudiante.excepciones'
import { RestaurarEstudiante } from '../../dominio/servicios/RestaurarEstudiante'
import { VerificarCuestionarioAprobado } from '../../dominio/servicios/VerificarCuestionarioAprobado'
import { ResponderCuestionarioComandoDTO } from '../dto/comandos/ResponderCuestionario.comando'
import { CursoMapeador } from '../mapeadores/Curso.mapeador'
import { PreguntaMapeador } from '../mapeadores/Pregunta.mapeador'
import { IRepositorioCursos } from '../puertos/IRepositorioCursos'
import { IRepositorioEstudiantes } from '../puertos/IRepositorioEstudiantes'
import { IRepositorioRespuestas } from '../puertos/IRepositorioRespuestas'

export class ServicioResponderCuestionario implements IServicioAplicacion {
  public constructor(
    private readonly repositorioRespuestas: IRepositorioRespuestas,
    private readonly repositorioEstudiantes: IRepositorioEstudiantes,
    private readonly repositorioCursos: IRepositorioCursos,
    private readonly busEventos: IBusEventos,
  ) {}

  public async ejecutar(
    comando: ResponderCuestionarioComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      //Verificamos curso y estudiante
      const estudiantePersistencia =
        await this.repositorioEstudiantes.consultar(comando.uuidEstudiante)

      if (!estudiantePersistencia)
        throw new EstudianteNoExiste('El estudiante no existe')
      const estudianteDominio = RestaurarEstudiante.restaurar(
        estudiantePersistencia.uuidEstudiante,
        estudiantePersistencia.estatus,
      )

      const cursoPersistencia = await this.repositorioCursos.consultar({
        uuid: comando.uuidCurso,
      })

      if (!cursoPersistencia)
        throw new CursoNoExiste('El curso no se ha encontrado.')
      const cursoDominio =
        CursoMapeador.ConvertirDetalleCursoDominio(cursoPersistencia)

      //Buscamos la informacion de las preguntas con el ID del cuestionario
      const consultarPreguntas = await this.repositorioRespuestas.consultar({
        uuidCuestionario: comando.uuidCuestionario,
      })

      //Mapeamos a dominio
      const preguntasDominio =
        PreguntaMapeador.ConvertirRespuestasDominio(consultarPreguntas)

      //Verificamos si aprueba
      const verificar = VerificarCuestionarioAprobado.verificar(
        preguntasDominio,
        comando.respuestasCuestionario,
      )

      if (verificar) estudianteDominio.cursoAprobado(cursoDominio.uuid)
      else estudianteDominio.cursoReprobado(cursoDominio.uuid)

      this.busEventos.publicar(estudianteDominio.obtenerEventos())

      return Resultado.ok<boolean>(verificar)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
