import { IRepositorioLecciones, LeccionesCursoPersistenciaDTO, LeccionesPersistenciaDTO } from "../../../aplicacion/puertos/IRepositorioLecciones"


    const lecciones = [
        {
            uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
            titulo: 'Como el helado de fresa ha cambiado nuestro universo',
        },
    ]

export class RepositorioLecciones implements IRepositorioLecciones {
    public async listar(query: LeccionesCursoPersistenciaDTO): Promise<LeccionesPersistenciaDTO[]> {
        return lecciones
    }
}