import { PreguntasCuestionarioDTO } from "../dto/queries/ConsultarCuestionario.query";

export interface ConsultarCuestionariosPeticionDTO{
    uuidCurso: string
}

export interface ConsultarCuestionarioPersistenciaDTO {
    uuid: string
    valorDuracion: number
    escalaDuracion: string
    intentosPermitidos: number
    preguntasCuestionarios: PreguntasCuestionarioDTO[]
}


export interface IRepositorioCuestionarios {
    consultar(query: ConsultarCuestionariosPeticionDTO): Promise<ConsultarCuestionarioPersistenciaDTO> 
}