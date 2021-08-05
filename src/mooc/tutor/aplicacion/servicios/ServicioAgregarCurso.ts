import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { CursoYaExiste } from '../../dominio/excepciones/curso/Curso.excepciones'
import { CrearCurso } from '../../dominio/servicios/CrearCurso'
import { DatosRestaurarListaHabilidades } from '../../dominio/servicios/RestaurarHabilidad';
import { CrearCursoComandoDTO } from '../dto/comandos/CrearCurso.comando'
import { CursoMapeador } from '../mapeadores/Curso.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioCursos } from '../puertos/IRepositorioCursos'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioAgregarCurso implements IServicioAplicacion {
  public constructor(
    private readonly repositorioCursos: IRepositorioCursos,
    private readonly repositorioHabilidades: IRepositorioHabilidades,
    private readonly servicioIdentificador: IServicioIdentificador,
    private readonly busEventos: IBusEventos,
  ) {}

  private async verificarExisteCurso(tituloCurso: string): Promise<void> {
    const existe = await this.repositorioCursos.existe(tituloCurso)
    if (existe)
      throw new CursoYaExiste('El curso ya se encuentra registrado.')
  }

  public async ejecutar(
    comando: CrearCursoComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Verificamos que el curso no exista actualmente
      await this.verificarExisteCurso(comando.titulo)

      // Mappemaos el comando a dominio
      const datosCurso = CursoMapeador.convertirComandoCrearCurso(
        this.servicioIdentificador.generarIdentificador(),
        comando,
      )

      // Creamos el curso
      const cursos = CrearCurso.crear(datosCurso)     

      // Persistimos el curso
      await this.repositorioCursos.crear({
        ...CursoMapeador.convertirDominioEnPersistencia(cursos)
      }) 

      // Publicamos eventos
     /*  await this.busEventos.publicar(cursos.obtenerEventos()) */

      // Retornamos ok
      return Resultado.ok<void>()
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
