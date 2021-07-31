import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ServicioConsultarCertificadosEstudiante } from "../../../aplicacion/servicios/ServicioConsultarCertificadosEstudiante";
import { RepositorioCertificados } from "../../adaptadores/RepositorioCertificados";
import { RepositorioEstudiantes } from "../../adaptadores/RepositorioEstudiantes";
import { QueryConsultarCertificadosEstudiante } from "../queries/ConsultarCertificadosEstudiante.query";

@QueryHandler(QueryConsultarCertificadosEstudiante)
export class HandlerConsultarCertificadosEstudiante implements IQueryHandler {
    private readonly repositorioCertificados: RepositorioCertificados
    private readonly repositorioEstudiantes: RepositorioEstudiantes
    private readonly consultarCertificados: ServicioConsultarCertificadosEstudiante

    public constructor(){
        this.repositorioCertificados = new RepositorioCertificados
        this.repositorioEstudiantes = new RepositorioEstudiantes
        this.consultarCertificados = new ServicioConsultarCertificadosEstudiante(
            this.repositorioCertificados, 
            this.repositorioEstudiantes,)
    }

    public async execute(query: QueryConsultarCertificadosEstudiante) {
        return this.consultarCertificados.ejecutar(query.datos)
    }
}