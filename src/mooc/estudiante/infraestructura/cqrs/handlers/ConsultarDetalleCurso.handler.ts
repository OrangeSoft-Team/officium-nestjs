import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ServicioConsultarDetalleCurso } from "../../../aplicacion/servicios/ServicioConsultarDetalleCurso";
import { RepositorioHabilidades } from "../../../infraestructura/adaptadores/RepositorioHabilidades";
import { RepositorioCursos } from "../../adaptadores/RepositorioCursos";
import { RepositorioLecciones } from "../../adaptadores/RepositorioLecciones";
import { QueryConsultarDetalleCurso } from "../queries/ConsultarDetalleCurso.query";


@QueryHandler(QueryConsultarDetalleCurso)
export class HandlerConsultarDetalleCurso implements IQueryHandler{

    private readonly repositorioCursos: RepositorioCursos
    private readonly repositorioHabilidades: RepositorioHabilidades
    private readonly repositorioLecciones: RepositorioLecciones

    private readonly consultarDetalleCurso: ServicioConsultarDetalleCurso

    public constructor(){
        this.repositorioCursos = new RepositorioCursos
        this.repositorioHabilidades = new RepositorioHabilidades
        this.repositorioLecciones = new RepositorioLecciones
        this.consultarDetalleCurso = new ServicioConsultarDetalleCurso(
            this.repositorioCursos,
            this.repositorioHabilidades,
            this.repositorioLecciones,
            )
    }
    public async execute(query: QueryConsultarDetalleCurso){
        return this.consultarDetalleCurso.ejecutar({uuidCurso: query.datos.uuidCurso})
    }
}
