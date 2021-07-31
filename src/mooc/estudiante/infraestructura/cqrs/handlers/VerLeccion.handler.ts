import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ServicioVerLeccion } from "../../../aplicacion/servicios/ServicioVerLeccion";
import { RepositorioCursos } from "../../adaptadores/RepositorioCursos";
import { RepositorioLecciones } from "../../adaptadores/RepositorioLecciones";
import { QueryVerLeccion } from "../queries/VerLeccion.query";

@QueryHandler(QueryVerLeccion)
export class HandlerVerLeccion implements IQueryHandler{
    private readonly repositorioLecciones: RepositorioLecciones
    private readonly repositorioCursos: RepositorioCursos
    private readonly verLeccion: ServicioVerLeccion

    public constructor() {
        this.repositorioLecciones = new RepositorioLecciones
        this.repositorioCursos = new RepositorioCursos
        this.verLeccion = new ServicioVerLeccion(this.repositorioCursos,this.repositorioLecciones)
    }

    public async execute(query: QueryVerLeccion){
        return this.verLeccion.ejecutar(query.datos)
    }
}