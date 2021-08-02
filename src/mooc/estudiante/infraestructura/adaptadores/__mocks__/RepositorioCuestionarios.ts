import { ConsultarCuestionarioRespuestaDTO, OpcionesPreguntaDTO, PreguntasCuestionarioDTO } from "../../../aplicacion/dto/queries/ConsultarCuestionario.query";
import { ConsultarCuestionarioPersistenciaDTO, ConsultarCuestionariosPeticionDTO, IRepositorioCuestionarios } from "../../../aplicacion/puertos/IRepositorioCuestionarios";


const opcion: OpcionesPreguntaDTO[] = [{
    uuid: 'aeded3af-56a5-4a49-874a-57231b57af28',
    valor: 'Helado de fresa',
},
{
    uuid: 'aeded3af-bba5-4a49-874a-57231b57af28',
    valor: 'Helado de chocolate',
}
]

const pregunta: PreguntasCuestionarioDTO[] = [
    {
    uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
    enunciado: 'Sabor favorito de helado de los estudiantes',
    tipo: 'SIMPLE',
    ponderacion: 10,
    opciones: opcion
    }
]

const cuestionario: ConsultarCuestionarioPersistenciaDTO = {
    uuid: 'ebaf050e-cd26-4ea1-9f26-2627bddcbbcb',
    valorDuracion: 2,
    escalaDuracion: 'HORA',
    intentosPermitidos: 4,
    preguntasCuestionarios: pregunta,
}


export class RepositorioCuestionarios implements IRepositorioCuestionarios{
    public async consultar(query: ConsultarCuestionariosPeticionDTO): Promise<ConsultarCuestionarioPersistenciaDTO> {
        return cuestionario
    }
}