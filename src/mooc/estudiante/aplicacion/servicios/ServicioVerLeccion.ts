import { IExcepcionAplicacion } from "../../../../comun/aplicacion/IExcepcionAplicacion";
import { IServicioAplicacion } from "../../../../comun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../../comun/aplicacion/Resultado";
import { CursoNoExiste } from "../../dominio/excepciones/curso/Curso.excepciones";
import { VerLeccionQueryDTO, VerLeccionRespuestaDTO } from "../dto/queries/VerLeccion.query";
import { LeccionMapeador } from "../mapeadores/Leccion.mapeador";
import { IRepositorioCursos } from "../puertos/IRepositorioCursos";
import { IRepositorioLecciones } from "../puertos/IRepositorioLecciones";

export class ServicioVerLeccion implements IServicioAplicacion {

    public constructor(
                private readonly repositorioCursos: IRepositorioCursos,
                private readonly repositorioLecciones: IRepositorioLecciones
    ){}
    public async ejecutar(query: VerLeccionQueryDTO): Promise<Resultado<any>> {
        try{

            //Consultar curso y leccion en persistencia
            const cursoPersistencia = await this.repositorioCursos.consultar({uuid: query.uuidCurso})
            if(!cursoPersistencia)
              throw new CursoNoExiste('El curso no se ha encontrado.')
            const leccionPersistencia = await this.repositorioLecciones.consultar({uuidLeccion: query.uuidLeccion})

            //transformar leccion en dominio
            const leccionDominio = LeccionMapeador.ConvertirLeccionDominio(leccionPersistencia)
            
            //transformar leccion en respuesta
            const respuesta = LeccionMapeador.ConvertirLeccionRespuesta(leccionDominio)
            return Resultado.ok<VerLeccionRespuestaDTO>(respuesta) 
        }catch(error){
            return Resultado.falla<IExcepcionAplicacion>(error)
        }
    }
    
}