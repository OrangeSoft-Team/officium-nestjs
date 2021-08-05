import { IRepositorioHabilidades, HabilidadesCursoPersistenciaDTO, HabilidadesPersistenciaDTO } from "../../../aplicacion/puertos/IRepositorioHabilidades";

const habilidades = [
    {
    uuid: 'aeaed3af-56a5-4a49-874a-57231b57af28'
    },
]

export class RepositorioHabilidades implements IRepositorioHabilidades {

    public async listar(query: HabilidadesCursoPersistenciaDTO): Promise<HabilidadesPersistenciaDTO[]> {
        return habilidades
    }
}