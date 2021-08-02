import { IRepositorioRespuestas, PreguntasPersistenciaDTO, PreguntasPeticionDTO } from "../../../aplicacion/puertos/IRepositorioRespuestas";

const opcion = [{
    uuid: 'aeded3af-56a5-4a49-874a-57231b57af28',
    valor: 'Helado de fresa',
    correcto: true
},
{
    uuid: 'aeded3af-bba5-4a49-874a-57231b57af28',
    valor: 'Helado de chocolate',
    correcto: false
}
]

const pregunta = [
    {
    uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
    enunciado: 'Sabor favorito de helado de los estudiantes',
    tipo: 'SIMPLE',
    ponderacion: 10,
    opciones: opcion
    }
]

export class RepositorioRespuestas implements IRepositorioRespuestas {

    public async consultar(comando: PreguntasPeticionDTO): Promise<PreguntasPersistenciaDTO[]> {
        return pregunta
    }
}