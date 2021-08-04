import { IExcepcionAplicacion } from "../../../../comun/aplicacion/IExcepcionAplicacion";
import { IServicioAplicacion } from "../../../../comun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../../comun/aplicacion/Resultado";
import { CuestionarioNoExiste } from "../../dominio/excepciones/cuestionario/Cuestionario.excepciones";
import { CursoNoExiste } from "../../dominio/excepciones/curso/Curso.excepciones";
import { ConsultarCuestionarioQueryDTO, ConsultarCuestionarioRespuestaDTO } from "../dto/queries/ConsultarCuestionario.query";
import { CuestionarioMapeador } from "../mapeadores/Cuestionario.mapeador";
import { PreguntaMapeador } from "../mapeadores/Pregunta.mapeador";
import { IRepositorioCuestionarios } from "../puertos/IRepositorioCuestionarios";
import { IRepositorioCursos } from "../puertos/IRepositorioCursos";

export class ServicioConsultarCuestionario implements IServicioAplicacion {
    public constructor(
        private readonly repositorioCursos: IRepositorioCursos,
        private readonly repositorioCuestionarios: IRepositorioCuestionarios
    ){}

    public async ejecutar(query: ConsultarCuestionarioQueryDTO): Promise<Resultado<any>> {
        try{

            const cursoExiste = await this.repositorioCursos.consultar({uuid: query.uuidCurso})
            if(!cursoExiste)
                throw new CursoNoExiste('El curso no se ha encontrado.')

            const cuestionarioPersistencia = await this.repositorioCuestionarios.consultar(query)
            if(!cuestionarioPersistencia) 
                throw new CuestionarioNoExiste('El cuestionario no se ha encontrado.')
            
            const preguntaDominio = PreguntaMapeador.ConvertirListaPreguntasDominio(cuestionarioPersistencia.preguntasCuestionarios)

            const cuestionarioDominio = CuestionarioMapeador.ConvertirCuestionarioDominio(cuestionarioPersistencia)

            const respuesta = CuestionarioMapeador.ConvertirCuestionarioRespuesta(cuestionarioDominio, cuestionarioPersistencia.preguntasCuestionarios)

            return Resultado.ok<ConsultarCuestionarioRespuestaDTO>(respuesta) 
    
        } catch(error) {
            return Resultado.falla<IExcepcionAplicacion>(error)
        }
    }
    
}