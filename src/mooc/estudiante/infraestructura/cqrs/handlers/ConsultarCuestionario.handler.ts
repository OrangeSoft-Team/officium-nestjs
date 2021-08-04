import { QueryHandler } from "@nestjs/cqrs";
import { ServicioConsultarCuestionario } from "../../../aplicacion/servicios/ServicioConsultarCuestionario";
import { RepositorioCuestionarios } from "../../adaptadores/RepositorioCuestionarios";
import { RepositorioCursos } from "../../adaptadores/RepositorioCursos";
import { QueryConsultarCuestionario } from "../queries/ConsultarCuestionario.query";

@QueryHandler(QueryConsultarCuestionario)
export class HandlerConsultarCuestionario {
    private readonly repositorioCursos: RepositorioCursos
    private readonly repositorioCuestionarios: RepositorioCuestionarios
    private readonly consultarCuestionario: ServicioConsultarCuestionario

    public constructor(){
        this.repositorioCursos = new RepositorioCursos()
        this.repositorioCuestionarios = new RepositorioCuestionarios()
        this.consultarCuestionario = new ServicioConsultarCuestionario(
            this.repositorioCursos,
            this.repositorioCuestionarios,
        )
    }

    public async execute(query: QueryConsultarCuestionario) {
        return this.consultarCuestionario.ejecutar(query.datos)
    }
}