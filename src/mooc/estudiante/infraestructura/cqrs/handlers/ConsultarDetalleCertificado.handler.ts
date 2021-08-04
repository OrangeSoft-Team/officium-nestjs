import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ServicioConsultarDetalleCertificado } from "../../../aplicacion/servicios/ServicioConsultarDetalleCertificado";
import { RepositorioCertificados } from "../../adaptadores/RepositorioCertificados";
import { QueryConsultarDetalleCertificado } from "../queries/ConsultarDetalleCertificado.query";

@QueryHandler(QueryConsultarDetalleCertificado)
export class HandlerConsultarDetalleCertificado implements IQueryHandler {
    private readonly repositorioCertificados: RepositorioCertificados
    private readonly consultarCertificados: ServicioConsultarDetalleCertificado

    public constructor(){
        this.repositorioCertificados = new RepositorioCertificados
        this.consultarCertificados = new ServicioConsultarDetalleCertificado(
            this.repositorioCertificados, )
    }

    public async execute(query: QueryConsultarDetalleCertificado) {
        return this.consultarCertificados.ejecutar(query.datos)
    }
}